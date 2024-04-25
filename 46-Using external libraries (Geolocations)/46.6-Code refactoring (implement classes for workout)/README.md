## 46.5 Code refactoring (implement classes for workouts)

After refactoring the code in previous section we have created a class for application and added methods for each operation. But if we take a closer look at workout, we have two types of workout cycling and running. Both this workouts have will have location coordinates, type (i.e. either cycling or running), distance and duration. Then based on type of workout we will have additional property which will be either speed or elevation. So here both cycling and running are type of workout and will have some common properties and some of their own properties. Hence we can see this as workout as a parent class and running and cycling are two child, where common properties will be in parent class and individual different properties will be in child class. This is what we are going to implement in this section.

So let's create the parent class first which is workout. In this class we will have all the common fields in both type of workouts and in addition to this we will add date and an id (unique). This date and id we will use further in next sections to display workout details on the screen.

```javascript
class Workout {
  date = new Date();
  id = (Date.now() + "").slice(-10);

  constructor(coords, distance, time) {
    this.coords = coords;
    this.distance = distance;
    this.time = time;
  }
}
```

In above code to generate unique id we must use some third party library or some logic which ensures the uniqueness and a structured id. But here for example purpose we are using date then converting it to string and taking last 10 characters from it.

Now we can extend this class and create two child classes for two different types of workouts with their additional properties and methods.

```javascript
class Workout {
  date = new Date();
  id = (Date.now() + "").slice(-10);

  constructor(coords, distance, time) {
    this.coords = coords;
    this.distance = distance;
    this.time = time;
  }
}

class Running extends Workout {
  constructor(coords, distance, time, speed) {
    super(coords, distance, time);
    this.speed = speed;
    this.calcGrade();
  }

  calcGrade() {
    if (this.distance >= 10 && this.speed >= 5) {
      this.grade = "Professional";
    } else {
      this.grade = "Beginner";
    }
    return this.grade;
  }
}

class Cycling extends Workout {
  constructor(coords, distance, time, elevation) {
    super(coords, distance, time);
    this.elevation = elevation;
    this.calcRank();
  }

  calcRank() {
    if (this.time < 5) this.rank = "1st";
    else this.rank = "last";

    return this.rank;
  }
}
```
