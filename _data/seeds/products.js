exports.seed = async function (knex) {
  await knex("products").truncate();
  await knex("products").insert([
    {
      id: "1",
      userId: "1",
      title: "Barbell",
      description:
        "A barbell is a piece of exercise equipment used in weight training, bodybuilding, weightlifting and powerlifting, consisting of a long bar, usually with weights attached at each end.",
      price: 99,
      image:
        "https://www.roguefitness.com/media/catalog/product/w/o/wod-toys-mini-barbell-fb.jpg",
    },
    {
      id: "2",
      userId: "2",
      title: "Titan Power Rack X3",
      description:
        "The Titan T-3 Series Tall Power Rack 24 inch Depth will help you work out safely and efficiently while performing squats, military press, bench press, curls, shrugs, dips and more!",
      price: 599,
      image:
        "https://www.titan.fitness/dw/image/v2/BDBZ_PRD/on/demandware.static/-/Sites-masterCatalog_Titan/default/dw4254d2e0/images/hi-res/Fitness/401025_01.jpg?sw=800&sh=800",
    },
    {
      id: "3",
      userId: "1",
      title: "Pull Up Bar",
      description:
        "Strength Doorway Pull up Bar Multi-Grip Chin UP Home Exercise Bar Horizontal Upper Body Workout Bar No Screw Installation Fitness Training Bars for Men & Women Home Gym Equipment.",
      price: 29.99,
      image:
        "https://images-na.ssl-images-amazon.com/images/I/51Ejh1vOnSL._AC_SL1308_.jpg",
    },
    {
      id: "4",
      userId: "2",
      title: "Set of 10lb Bumper Plates",
      description: "Economy Black Bumper Plates.",
      price: 99.99,
      image:
        "https://www.titan.fitness/dw/image/v2/BDBZ_PRD/on/demandware.static/-/Sites-masterCatalog_Titan/default/dw243ece04/images/hi-res/Fitness/430118_01.jpg?sw=800&sh=800",
    },
  ]);
};
