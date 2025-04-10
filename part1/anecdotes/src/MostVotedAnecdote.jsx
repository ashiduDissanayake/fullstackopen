const MostVotedAnecdote = ({ anecdote, votes }) => {
    return (
      <div>
        <h1>Anecdote with most votes</h1>
        <p>{anecdote}</p>
        <p>has {votes} votes</p>
      </div>
    );
  };
  
  export default MostVotedAnecdote;