interface HeaderProps {
  courseName: string;
}

const Header = (props: HeaderProps): JSX.Element => {
  return <h1>{props.courseName}</h1>
}

interface Course {
  name: string;
  exerciseCount: number;
}

interface ContentProps {
  courses: Course[];
}

const Content = (props: ContentProps): JSX.Element => {
  return (
    <>
    {
      props.courses.map(c => (
        <p key={c.name}>
          {c.name} {c.exerciseCount}
        </p>
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

const App = () => {
  const courseName = "Half Stack application development";
  const courseParts = [
    {
      name: "Fundamentals",
      exerciseCount: 10
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14
    }
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