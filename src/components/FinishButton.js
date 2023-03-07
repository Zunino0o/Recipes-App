function FinishButton({ isFinish }) {
  return (
    <button type="button" data-testid="finish-recipe-btn" disabled={!isFinish}>
      Finalizar
    </button>
  );
}

export default FinishButton;
