"""
generate_cosmic_web.py
========================================================================
Genera una realización procedural de la red cósmica (cosmic web) usando
las mismas técnicas que Uchuu/2LPTIC usa para sus condiciones iniciales:

    1. Campo de densidad gaussiano aleatorio con espectro de potencia
       LCDM (transferencia BBKS + normalizacion aproximada por sigma8).
    2. Desplazamiento de partículas via aproximación de Zel'dovich
       (teoría de perturbaciones lagrangiana de primer orden).

No reproduce la simulación de Uchuu bit a bit (esa requiere N-body
completo en supercomputador), pero genera una topología de filamentos,
nodos y vacíos estadísticamente correcta para el mismo modelo cosmológico,
a un costo computacional de segundos y un footprint de unos MB.

Salida: un binario propio (.cweb) que el loader de Three.js puede
        parsear directamente sin ninguna librería de por medio.

Formato del binario (little-endian):
    int32   magic          = 0x43574542  ("CWEB")
    int32   n_particles
    float32 box_size_mpc    (lado de la caja, en Mpc, ya sin /h)
    float32 particle_data[n_particles * 4]   -> x, y, z, overdensity
                                                 (x,y,z centrados en 0)
========================================================================
"""

import numpy as np
import struct

# ------------------------------------------------------------------
# 1. PARÁMETROS
# ------------------------------------------------------------------

# --- Cosmología (Planck 2020, mismos parámetros que usa Uchuu) ---
OMEGA_M = 0.3089
OMEGA_B = 0.0486
H0 = 0.6774          # h = H0 / 100
NS = 0.9667          # índice espectral
SIGMA8 = 0.8159       # normalización de la amplitud

# --- Malla / volumen ---
GRID = 96             # partículas por lado (GRID^3 partículas totales)
BOX_SIZE_MPC_H = 200.0   # lado de la caja en Mpc/h
BOX_SIZE_MPC = BOX_SIZE_MPC_H / H0   # convertido a Mpc reales

# --- Semilla (cambia esto para universos distintos) ---
SEED = 42

OUTPUT_PATH = "cosmic_web.cweb"


# ------------------------------------------------------------------
# 2. ESPECTRO DE POTENCIA: transferencia BBKS + forma de Sugiyama
# ------------------------------------------------------------------
def bbks_transfer_function(k_h_mpc):
    """
    Transferencia CDM de Bardeen, Bond, Kaiser & Szalay (1986),
    con el parámetro de forma corregido por bariones (Sugiyama 1995).
    k_h_mpc: número de onda en h/Mpc
    """
    gamma = OMEGA_M * H0 * np.exp(
        -OMEGA_B * (1.0 + np.sqrt(2.0 * H0) / OMEGA_M)
    )
    q = k_h_mpc / gamma
    q = np.maximum(q, 1e-10)
    T = (np.log(1.0 + 2.34 * q) / (2.34 * q)) * (
        1.0 + 3.89 * q + (16.1 * q) ** 2 + (5.46 * q) ** 3 + (6.71 * q) ** 4
    ) ** -0.25
    return T


def power_spectrum(k_h_mpc):
    """P(k) ∝ k^ns * T(k)^2, normalizado más abajo por sigma8."""
    T = bbks_transfer_function(k_h_mpc)
    P = np.where(k_h_mpc > 0, (k_h_mpc ** NS) * T ** 2, 0.0)
    return P


def normalize_amplitude_sigma8(grid, box_size_h_mpc):
    """
    Estima la varianza del campo suavizado con un filtro top-hat de
    radio 8 Mpc/h y reescala la amplitud para que sigma(8 Mpc/h) = SIGMA8.
    Aproximación discreta suficiente para fines de visualización.
    """
    kx = np.fft.fftfreq(grid, d=box_size_h_mpc / grid) * 2 * np.pi
    kX, kY, kZ = np.meshgrid(kx, kx, kx, indexing="ij")
    kk = np.sqrt(kX**2 + kY**2 + kZ**2)
    kk[0, 0, 0] = 1e-10

    Pk = power_spectrum(kk)

    # ventana top-hat en el espacio de Fourier, R = 8 Mpc/h
    R = 8.0
    x = kk * R
    Wk = np.where(x > 1e-6, 3.0 * (np.sin(x) - x * np.cos(x)) / (x**3), 1.0)

    variance_unnormalized = np.sum(Pk * Wk**2) / grid**3
    if variance_unnormalized <= 0:
        return 1.0
    return (SIGMA8**2) / variance_unnormalized


# ------------------------------------------------------------------
# 3. CAMPO GAUSSIANO ALEATORIO
# ------------------------------------------------------------------
def generate_density_field(grid, box_size_h_mpc, seed):
    rng = np.random.default_rng(seed)

    # ruido blanco real, luego pesado en Fourier por sqrt(P(k))
    white = rng.normal(size=(grid, grid, grid))
    white_k = np.fft.rfftn(white)

    kx = np.fft.fftfreq(grid, d=box_size_h_mpc / grid) * 2 * np.pi
    kz = np.fft.rfftfreq(grid, d=box_size_h_mpc / grid) * 2 * np.pi
    kX, kY, kZ = np.meshgrid(kx, kx, kz, indexing="ij")
    kk = np.sqrt(kX**2 + kY**2 + kZ**2)
    kk_safe = np.where(kk > 0, kk, 1e-10)

    amp = normalize_amplitude_sigma8(grid, box_size_h_mpc)
    Pk = power_spectrum(kk_safe) * amp

    delta_k = white_k * np.sqrt(Pk) * (grid**1.5) / box_size_h_mpc**1.5
    delta_k[0, 0, 0] = 0.0  # sin modo DC (densidad media = 0)

    delta_x = np.fft.irfftn(delta_k, s=(grid, grid, grid), axes=(0, 1, 2))
    return delta_x, kX, kY, kZ, kk_safe, delta_k


# ------------------------------------------------------------------
# 4. DESPLAZAMIENTO DE ZEL'DOVICH
# ------------------------------------------------------------------
def zeldovich_displacement(delta_k, kX, kY, kZ, kk_safe, grid):
    """
    Psi_k = i * k / k^2 * delta_k   (resuelve delta = -div(Psi))
    Se calcula una componente por eje y se transforma a espacio real.
    """
    factor = 1j / (kk_safe**2)
    psi_x = np.fft.irfftn(factor * kX * delta_k, s=(grid, grid, grid), axes=(0, 1, 2))
    psi_y = np.fft.irfftn(factor * kY * delta_k, s=(grid, grid, grid), axes=(0, 1, 2))
    psi_z = np.fft.irfftn(factor * kZ * delta_k, s=(grid, grid, grid), axes=(0, 1, 2))
    return psi_x, psi_y, psi_z


# ------------------------------------------------------------------
# 5. PIPELINE PRINCIPAL
# ------------------------------------------------------------------
def main():
    print(f"Generando campo de densidad ({GRID}^3 = {GRID**3:,} celdas)...")
    delta_x, kX, kY, kZ, kk_safe, delta_k = generate_density_field(
        GRID, BOX_SIZE_MPC_H, SEED
    )

    print("Calculando desplazamiento de Zel'dovich...")
    psi_x, psi_y, psi_z = zeldovich_displacement(delta_k, kX, kY, kZ, kk_safe, GRID)

    # normaliza la magnitud del desplazamiento para que el colapso
    # produzca filamentos nítidos sin que las partículas se crucen
    # de forma caótica (factor de crecimiento efectivo ~1.4-1.8 va bien
    # para un box de 200 Mpc/h a GRID=96)
    growth_factor = 1.6
    psi_x *= growth_factor
    psi_y *= growth_factor
    psi_z *= growth_factor

    print("Desplazando la malla lagrangiana de partículas...")
    cell = BOX_SIZE_MPC_H / GRID
    idx = np.arange(GRID)
    qX, qY, qZ = np.meshgrid(idx * cell, idx * cell, idx * cell, indexing="ij")

    x = (qX + psi_x) % BOX_SIZE_MPC_H
    y = (qY + psi_y) % BOX_SIZE_MPC_H
    z = (qZ + psi_z) % BOX_SIZE_MPC_H

    # sobredensidad local (para colorear filamentos vs vacíos)
    overdensity = delta_x
    od_min, od_max = np.percentile(overdensity, [1, 99])
    overdensity_norm = np.clip(
        (overdensity - od_min) / (od_max - od_min + 1e-10), 0.0, 1.0
    )

    x_h_mpc = x.ravel().astype(np.float32)
    y_h_mpc = y.ravel().astype(np.float32)
    z_h_mpc = z.ravel().astype(np.float32)
    dens = overdensity_norm.ravel().astype(np.float32)

    # convierte de Mpc/h -> Mpc reales y centra la caja en el origen
    x_mpc = (x_h_mpc / H0) - BOX_SIZE_MPC / 2.0
    y_mpc = (y_h_mpc / H0) - BOX_SIZE_MPC / 2.0
    z_mpc = (z_h_mpc / H0) - BOX_SIZE_MPC / 2.0

    n_particles = x_mpc.size
    print(f"Escribiendo {n_particles:,} partículas -> {OUTPUT_PATH}")

    interleaved = np.empty(n_particles * 4, dtype=np.float32)
    interleaved[0::4] = x_mpc
    interleaved[1::4] = y_mpc
    interleaved[2::4] = z_mpc
    interleaved[3::4] = dens

    with open(OUTPUT_PATH, "wb") as f:
        f.write(struct.pack("<i", 0x43574542))       # magic "CWEB"
        f.write(struct.pack("<i", n_particles))
        f.write(struct.pack("<f", BOX_SIZE_MPC))
        f.write(interleaved.tobytes())

    size_mb = (12 + interleaved.nbytes) / (1024 * 1024)
    print(f"Listo. Tamaño del archivo: {size_mb:.2f} MB")
    print(f"Caja: {BOX_SIZE_MPC:.1f} Mpc de lado, {n_particles:,} partículas")

    return x_mpc, y_mpc, z_mpc, dens


if __name__ == "__main__":
    main()
