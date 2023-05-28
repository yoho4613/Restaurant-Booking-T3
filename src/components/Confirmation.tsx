import React from "react";

type ConfirmationProps = {
  message: string;
  onConfirm: (prev: boolean) => void;
  onCancel: () => void;
  optionOne: string;
  optionTwo: string;
};

const Confirmation: React.FC<ConfirmationProps> = ({
  message,
  onConfirm,
  onCancel,
  optionOne,
  optionTwo,
}) => {
  const handleConfirmOne = () => {
    onConfirm(true);
    window.removeEventListener("keydown", handleKeyDown);
  };
  const handleConfirmTwo = () => {
    onConfirm(false);
    window.removeEventListener("keydown", handleKeyDown);
  };

  const handleCancel = () => {
    onCancel();
    window.removeEventListener("keydown", handleKeyDown);
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      handleCancel();
    }
  };

  window.addEventListener("keydown", handleKeyDown);

  return (
    <>
      <div className="confirmation-background" onClick={handleCancel}></div>
      <div className="confirmation">
        <div className="confirmation-message">{message}</div>
        <div className="confirmation-buttons">
          <button
            className="confirmation-button confirm"
            onClick={handleConfirmOne}
          >
            {optionOne}
          </button>
          <button
            className="confirmation-button cancel"
            onClick={handleConfirmTwo}
          >
            {optionTwo}
          </button>
        </div>
      </div>
    </>
  );
};

export default Confirmation;
