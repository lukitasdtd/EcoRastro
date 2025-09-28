export interface CropDetail {
  name: string;
  sowingGuide: {
    depth: string;
    spacing: string;
    light: string;
    irrigation: string;
  };
  harvest: string;
  commonProblems: string;
}

export const cropDetails: Record<string, CropDetail> = {
  "tomate-cherry": {
    name: "Tomate Cherry",
    sowingGuide: {
      depth: "1 cm",
      spacing: "40-60 cm entre plantas",
      light: "Pleno sol (mínimo 6-8 horas diarias)",
      irrigation: "Frecuente y regular. Mantener el sustrato húmedo pero no encharcado."
    },
    harvest: "Aproximadamente 60-70 días después de la siembra. Cosechar cuando los frutos estén de un color rojo intenso y se desprendan fácilmente.",
    commonProblems: "Suele ser propenso a pulgones y la mosca blanca. El exceso de humedad puede favorecer la aparición de hongos como el mildiu."
  },
  // Aquí se podrán añadir más cultivos en el futuro
  // Ejemplo:
  // "lechuga": {
  //   name: "Lechuga",
  //   ...
  // }
};
