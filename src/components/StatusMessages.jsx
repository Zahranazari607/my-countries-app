const StatusMessages = ({ loading, error, onRetry }) => {
  if (loading) return <div className="loading">Loading countries...</div>;
  if (error) return (
    <div className="error-container">
      <p>Error: {error}</p>
      <button className="retry-btn" onClick={onRetry}>Retry</button>
    </div>
  );
  return null;
};
export default StatusMessages;