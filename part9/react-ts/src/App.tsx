interface HeaderProps {
  courseName: string;
}

const Header = (props: HeaderProps): JSX.Element => {
  return <h1>{props.courseName}</h1>
}

interface ContentProps {
  courses: CoursePart[];
}

const Content = (props: ContentProps): JSX.Element => {
  return (
    <>
      {
        props.courses.map(c => (
          <Part part={c} />
        ))
      }
    </>
  );
};

interface TotalProps {
  totalExercises: number;
}

const Total = (props: TotalProps): JSX.Element => {
  return (
    <p>
      Number of exercises {props.totalExercises}
    </p>
  );
};

interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartDescription extends CoursePartBase {
  description: string;
}

interface CoursePartBasic extends CoursePartDescription {
  kind: "basic"
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group"
}

interface CoursePartBackground extends CoursePartDescription {
  backgroundMaterial: string;
  kind: "background"
}

interface CoursePartSpecial extends CoursePartDescription {
  requirements: string[];
  kind: "special";
}

type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground | CoursePartSpecial;

interface PartProp {
  part: CoursePart;
}

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Part = (props: PartProp): JSX.Element => {
  const part = props.part;
  switch (part.kind) {
    case "basic":
      return (
        <div>
          <h3>{part.name} {part.exerciseCount}</h3>
          <p><i>{part.description}</i></p>
        </div>
      );
    case "group":
      return (
        <div>
          <h3>{part.name} {part.exerciseCount}</h3>
          <p>project exercise {part.groupProjectCount}</p>
        </div>
      );
    case "background":
      return (
        <div>
          <h3>{part.name} {part.exerciseCount}</h3>
          <p><i>{part.description}</i></p>
          <p>submit to {part.backgroundMaterial}</p>
        </div>
      );
    case "special":
      return (
        <div>
          <h3>{part.name} {part.exerciseCount}</h3>
          <p><i>{part.description}</i></p>
          <p>required skills: {part.requirements.join(", ")}</p>
        </div>
      );
    default:
      return assertNever(part);
  }
};

const App = () => {
  const courseName = "Half Stack application development";
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part",
      kind: "basic"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      kind: "group"
    },
    {
      name: "Basics of type Narrowing",
      exerciseCount: 7,
      description: "How to go from unknown to string",
      kind: "basic"
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      backgroundMaterial: "https://type-level-typescript.com/template-literal-types",
      kind: "background"
    },
    {
      name: "TypeScript in frontend",
      exerciseCount: 10,
      description: "a hard part",
      kind: "basic",
    },
  ];

  const totalExercises = courseParts.reduce((sum, part) => sum + part.exerciseCount, 0);

  return (
    <div>
      <Header courseName={courseName} />
      <Content courses={courseParts} />
      <Total totalExercises={totalExercises} />
    </div>
  );
};

export default App;