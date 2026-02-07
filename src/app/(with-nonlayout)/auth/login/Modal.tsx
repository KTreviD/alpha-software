import { CardBody, Col, Row, Modal } from "reactstrap";
import { useEffect, useRef, useState } from "react";

type ModalTwoFactorCodeT = {
  isOpen: boolean;
  email: string;
  onComplete: (code: string) => void;
};

const CODE_LENGTH = 6;

const ModalTwoFactorCode = ({
  isOpen,
  email,
  onComplete,
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
      <CardBody className="p-4">
        <h4 style={{ fontWeight: 600 }}>Two-step Verification</h4>

        <div className="mb-4 mt-4 text-center">
          <div className="avatar-lg mx-auto">
            <div className="avatar-title bg-light text-primary display-5 rounded-circle">
              <i className="ri-mail-line"></i>
            </div>
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
      </CardBody>
    </Modal>
  );
};

export default ModalTwoFactorCode;
