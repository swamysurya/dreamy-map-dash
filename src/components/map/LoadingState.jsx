
const LoadingState = () => {
  return (
    <div className="min-h-screen pt-16 flex items-center justify-center animated-background">
      <div className="animate-pulse-slow">
        <div className="w-16 h-16 mb-4 rounded-full bg-primary/20 mx-auto"></div>
        <div className="h-4 w-32 bg-primary/20 rounded mx-auto"></div>
      </div>
    </div>
  );
};

export default LoadingState;
