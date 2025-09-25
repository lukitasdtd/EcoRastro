/**
 * Valida un RUT chileno.
 * @param rut - El RUT en formato string, puede contener puntos y guion.
 * @returns `true` si el RUT es válido, `false` en caso contrario.
 */
export const validateRut = (rut: string): boolean => {
    // Limpia el RUT de puntos, guiones y lo convierte a mayúsculas
    const cleanRut = rut.replace(/[^0-9kK]/g, '').toUpperCase();
    
    // Un RUT debe tener al menos 2 caracteres (cuerpo + dv)
    if (cleanRut.length < 2) {
        return false;
    }

    // Separa el cuerpo del dígito verificador
    const body = cleanRut.slice(0, -1);
    const dv = cleanRut.slice(-1);

    if (isNaN(parseInt(body, 10))) {
        return false;
    }

    let suma = 0;
    let multiplo = 2;

    // Algoritmo del Módulo 11
    // Recorre el cuerpo del RUT de derecha a izquierda
    for (let i = body.length - 1; i >= 0; i--) {
        suma += parseInt(body.charAt(i), 10) * multiplo;
        if (multiplo < 7) {
            multiplo++;
        } else {
            multiplo = 2;
        }
    }

    // Calcula el dígito verificador esperado
    const dvEsperado = 11 - (suma % 11);
    
    // Compara el DV calculado con el ingresado
    const dvFinal = dvEsperado === 11 ? '0' : dvEsperado === 10 ? 'K' : dvEsperado.toString();

    return dv === dvFinal;
};
