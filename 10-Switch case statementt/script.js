const day = "tuesday";

switch (day) {
  case "monday":
    console.log(`What..!! 😫It's monday already..??`);
    console.log(`That means it's office time again.`);
    break;
  case "tuesday":
    console.log(`4 more days for the weekend..!!`);
    break;
  case "wednesday":
  case "thursday":
    console.log(`OMG, I have lot's of work to finish..!!`);
    console.log(`Let's finish it today.`);
    break;
  case "friday":
    console.log(`Yey..!! It's firday. Lte's have some fun..!!`);
    break;
  case "saturday":
  case "sunday":
    console.log(`It's weekend, so relax..!!`);
    break;
  default:
    console.log(`Wait what..?? Is this even a day..??`);
}
