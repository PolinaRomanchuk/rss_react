export type Pokemon = {
  name: string;
  description: string;
  image: string;
  order: number;
  abilities?: [{ ability: { name: string } }];
  stats?: [
    {
      base_stat: number;
      stat: {
        name: string;
      };
    },
  ];
};
