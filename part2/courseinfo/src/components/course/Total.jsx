const Total = ({ parts }) => {
  const total = parts.reduce((sum, part) => {
    return sum + part.exercises;
  }, 0);

  return <strong>total of exercises {total}</strong>;
};

export default Total;
