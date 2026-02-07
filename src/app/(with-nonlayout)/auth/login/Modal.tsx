import { CardBody, Col, Row, Modal, Spinner } from "reactstrap";
import { useEffect, useRef, useState } from "react";

type ModalTwoFactorCodeT = {
  isOpen: boolean;
  email: string;
  canResend: boolean;
  resendTimer: number;
  isLoadingResend: boolean;
  isLoadingMFA: boolean;
  onComplete: (code: string) => void;
  onClose: () => void;
  onResend: () => Promise<void>;
};

const CODE_LENGTH = 6;
const RESEND_DELAY = 30; // segundos

const ModalTwoFactorCode = ({
  isOpen,
  email,
  canResend,
  isLoadingResend,
  resendTimer,
  isLoadingMFA,
  onComplete,
  onClose,
  onResend,
}: ModalTwoFactorCodeT) => {
  const [code, setCode] = useState<string[]>(Array(CODE_LENGTH).fill(""));

  const inputsRef = useRef<HTMLInputElement[]>([]);

  const handleChange = (value: string, index: number) => {
    if (!/^\d?$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < CODE_LENGTH - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handlePaste = (
    e: React.ClipboardEvent<HTMLInputElement>,
    index: number
  ) => {
    e.preventDefault();
    const paste = e.clipboardData.getData("text").replace(/\D/g, ""); // solo números
    if (!paste) return;

    const newCode = [...code];

    // Reemplaza desde el índice actual
    for (let i = 0; i < paste.length; i++) {
      if (index + i < CODE_LENGTH) {
        newCode[index + i] = paste[i];
      }
    }

    setCode(newCode);

    // Mueve el foco al último dígito pegado
    const nextIndex = Math.min(index + paste.length, CODE_LENGTH - 1);
    inputsRef.current[nextIndex]?.focus();
  };

  // 🚀 Auto submit
  useEffect(() => {
    const joined = code.join("");
    if (joined.length === CODE_LENGTH) {
      onComplete(joined);
    }
  }, [code]);

  // Reset al abrir
  useEffect(() => {
    if (isOpen) {
      setCode(Array(CODE_LENGTH).fill(""));
      setTimeout(() => inputsRef.current[0]?.focus(), 100);
    }
  }, [isOpen]);

  return (
    <Modal isOpen={isOpen} centered>
      <CardBody className="p-4 pb-2">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h4 style={{ fontWeight: 600, margin: 0 }}>Two-step Verification</h4>

          <button
            type="button"
            className="btn btn-link p-0"
            style={{ textDecoration: "underline" }}
            onClick={onClose}
          >
            Back to sign-in
          </button>
        </div>

        <div className="mb-4 mt-4 text-center">
          <div className="avatar-lg mx-auto">
            {isLoadingMFA ? (
              <Spinner
                size="sm"
                color="primary"
                className="mt-4"
                style={{
                  width: 48,
                  height: 48,
                }}
              />
            ) : (
              <div className="avatar-title bg-light text-primary display-5 rounded-circle">
                <i className="ri-mail-line"></i>
              </div>
            )}
          </div>
        </div>

        <Row className="justify-content-center mb-3">
          {code.map((digit, i) => (
            <Col key={i} className="col-2">
              <input
                ref={el => {
                  if (el) inputsRef.current[i] = el;
                }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={e => handleChange(e.target.value, i)}
                onKeyDown={e => handleKeyDown(e, i)}
                onPaste={e => handlePaste(e, i)}
                className="form-control form-control-lg bg-light border-light text-center"
              />
            </Col>
          ))}
        </Row>

        <div className="text-muted text-center mx-lg-3 pt-2">
          <p>
            Verification code was sent to{" "}
            <span className="fw-semibold">{email}.</span>
          </p>
          <p>Enter the code above to continue.</p>
        </div>
        <div className="d-flex flex-column align-items-center mt-3">
          {!canResend ? (
            <>
              <div
                className="position-relative"
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: "50%",
                  background: `conic-gradient(#0d6efd ${
                    ((RESEND_DELAY - resendTimer) / RESEND_DELAY) * 360
                  }deg, #e9ecef 0deg)`,
                }}
              >
                <div
                  className="position-absolute top-50 start-50 translate-middle bg-white rounded-circle"
                  style={{ width: 38, height: 38 }}
                />
              </div>

              <small className="text-muted mt-2 mb-3">
                Resend the code in{" "}
                <strong>00:{resendTimer.toString().padStart(2, "0")}</strong>
              </small>
            </>
          ) : (
            <button
              type="button"
              className="btn btn-link p-0 mb-3"
              style={{ textDecoration: "underline" }}
              onClick={() => {
                onResend();
              }}
            >
              Resend the code
            </button>
          )}
        </div>
      </CardBody>
    </Modal>
  );
};

export default ModalTwoFactorCode;
