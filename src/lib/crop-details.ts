export type CropDetail = {
  name: string;
  description: string;
  planting_time: string;
  harvest_time: string;
  care: string[];
};

export const cropDetails: { [key: string]: CropDetail } = {
  tomate: {
    name: 'Tomate',
    description: 'El tomate es una de las hortalizas más populares y versátiles, ideal para huertos caseros.',
    planting_time: 'Siembra en almácigo a fines de invierno. Trasplantar a su lugar definitivo en primavera.',
    harvest_time: 'Aproximadamente 3-4 meses después de la siembra, cuando los frutos estén rojos y firmes.',
    care: [
      'Necesita mucho sol (mínimo 6 horas diarias).',
      'Riego regular y profundo en la base, sin mojar las hojas para evitar hongos.',
      'Entutorar la planta para mantener los frutos fuera del suelo.',
      'Abonar con compost o un fertilizante rico en potasio cada 15 días durante la fructificación.'
    ]
  },
  albahaca: {
    name: 'Albahaca',
    description: 'Hierba aromática indispensable en la cocina, perfecta para cultivar en macetas o junto a los tomates.',
    planting_time: 'Siembra en primavera, cuando no haya riesgo de heladas.',
    harvest_time: 'Se pueden cosechar las hojas tan pronto como la planta tenga suficiente follaje (aprox. 2 meses).',
    care: [
      'Le gusta el sol, pero agradece algo de sombra en las horas de más calor.',
      'Riego frecuente para mantener el sustrato ligeramente húmedo.',
      'Pinzar las flores para prolongar la producción de hojas.',
      'Se asocia bien con los tomates, repeliendo algunas plagas.'
    ]
  },
  lechuga: {
    name: 'Lechuga',
    description: 'Una verdura de hoja verde rápida y fácil de cultivar, ideal para ensaladas frescas.',
    planting_time: 'Se puede sembrar durante casi todo el año, evitando los meses de calor extremo.',
    harvest_time: 'Entre 45 y 75 días, dependiendo de la variedad. Se pueden cortar hojas sueltas o la planta entera.',
    care: [
      'Prefiere climas frescos y algo de sombra parcial.',
      'Riego ligero pero frecuente para mantener el suelo húmedo.',
      'Cuidado con babosas y caracoles.',
      'Cosechar por la mañana para obtener hojas más crujientes.'
    ]
  },
  zanahoria: {
    name: 'Zanahoria',
    description: 'Raíz comestible muy nutritiva. Requiere un suelo suelto y profundo para un buen desarrollo.',
    planting_time: 'Siembra directa en el suelo desde principios de primavera hasta finales de verano.',
    harvest_time: 'Generalmente de 2 a 4 meses después de la siembra.',
    care: [
      'Necesita un suelo arenoso, suelto y sin piedras.',
      'Riego regular para evitar que las raíces se agrieten.',
      'Aclarar las plántulas para dejar un espacio de 5-7 cm entre ellas.',
      'La punta de la raíz debe estar siempre cubierta de tierra para que no se ponga verde.'
    ]
  },
  espinaca: {
    name: 'Espinaca',
    description: 'Verdura de hoja muy nutritiva y de crecimiento rápido, ideal para climas frescos.',
    planting_time: 'Desde finales de verano hasta la primavera. No le gusta el calor.',
    harvest_time: 'Unos 40-60 días después de la siembra. Cosechar hoja por hoja.',
    care: [
      'Crece mejor a la sombra o con sol de mañana.',
      'Mantener el suelo húmedo para un crecimiento rápido y evitar que florezca prematuramente.',
      'Rica en nitrógeno, agradece un suelo bien abonado con compost.',
      'Cosechar las hojas exteriores para fomentar un crecimiento continuo.'
    ]
  },
  ajo: {
    name: 'Ajo',
    description: 'Un cultivo de invierno fácil que produce cabezas de ajo para usar durante todo el año.',
    planting_time: 'Plantar los dientes de ajo en otoño para cosechar en verano.',
    harvest_time: 'Cuando las hojas comiencen a amarillear y secarse (principios o mediados de verano).',
    care: [
      'Pleno sol y suelo con buen drenaje.',
      'Riego moderado, reduciéndolo cuando las hojas empiezan a secarse.',
      'No requiere mucho fertilizante.',
      'Dejar de regar unas semanas antes de la cosecha.'
    ]
  },
  habas: {
    name: 'Habas',
    description: 'Leguminosa resistente al frío que además enriquece el suelo con nitrógeno.',
    planting_time: 'Siembra en otoño en climas suaves o a finales del invierno/principios de primavera en zonas más frías.',
    harvest_time: 'Aproximadamente 3-4 meses después de la siembra.',
    care: [
      'Pleno sol.',
      'Riego moderado. Son bastante resistentes a la sequía una vez establecidas.',
      'Pueden necesitar soporte si crecen mucho.',
      'Fijan nitrógeno en el suelo, beneficiando a cultivos posteriores.'
    ]
  },
  puerros: {
    name: 'Puerros',
    description: 'Pariente de la cebolla y el ajo, con un sabor más suave. Tienen un ciclo de cultivo largo.',
    planting_time: 'Sembrar en almácigos a finales de invierno o principios de primavera.',
    harvest_time: 'Unos 5-7 meses después de la siembra.',
    care: [
      'Necesitan sol y un suelo rico y profundo.',
      'Aporcar (amontonar tierra alrededor del tallo) para conseguir un tallo más blanco y tierno.',
      'Riego constante durante toda la temporada.',
      'Son bastante resistentes a plagas y enfermedades.'
    ]
  },
  rabanitos: {
    name: 'Rabanitos',
    description: 'Cultivo muy rápido y fácil, perfecto para principiantes y para huertos pequeños.',
    planting_time: 'Se pueden sembrar durante gran parte del año, especialmente en primavera y otoño.',
    harvest_time: '¡Tan rápido como 3-4 semanas después de la siembra!',
    care: [
      'Sol o sombra parcial.',
      'Suelo suelto y riego regular para un crecimiento rápido y evitar que se vuelvan picantes.',
      'Sembrar de forma escalonada cada 2 semanas para tener una cosecha continua.',
      'Cosechar tan pronto como tengan un tamaño adecuado.'
    ]
  },
  acelga: {
    name: 'Acelga',
    description: 'Verdura de hoja muy productiva y ornamental, con pencas de colores vivos según la variedad.',
    planting_time: 'Se puede sembrar durante todo el año, aunque prefiere climas templados.',
    harvest_time: 'Cosecha continua hoja por hoja a partir de los 2 meses.',
    care: [
      'Tolera tanto el sol como la sombra parcial.',
      'Riego regular.',
      'Muy resistente y poco propensa a plagas.',
      'Cortar las hojas exteriores dejando el centro para que siga produciendo.'
    ]
  },
  pimiento: {
    name: 'Pimiento',
    description: 'Hortaliza de verano que necesita calor para prosperar y producir frutos dulces o picantes.',
    planting_time: 'Sembrar en almácigo protegido a finales de invierno y trasplantar cuando haya pasado el riesgo de heladas.',
    harvest_time: 'Unos 3-4 meses después de la siembra.',
    care: [
      'Requiere mucho sol y calor.',
      'Riego regular, especialmente durante la floración y el desarrollo del fruto.',
      'Suelo rico en materia orgánica.',
      'Puede necesitar entutorado para soportar el peso de los pimientos.'
    ]
  }
};
