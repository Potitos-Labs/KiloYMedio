import { date, input } from "zod";
import { FormWrapper } from "./FormWrapper";
import { formatCreditCardNumber, formatExpirationDate } from "./utils";

type AddressData = {
  fullNamePayment: string;
  address: string;
  facturationAddress: string;
  creditCardNumber: string;
  CVV: string;
  expirationDate: string;
  errorMessage: string;
};

type AddressFormProps = AddressData & {
  updateFields: (fields: Partial<AddressData>) => void;
};

const PaymentGateway = ({
  fullNamePayment,
  address,
  facturationAddress,
  creditCardNumber,
  CVV,
  expirationDate,
  errorMessage,
  updateFields,
}: AddressFormProps) => {
  const date = new Date();
  const year = date.getUTCFullYear();

  const handleInputChange = ({ target }: { target: HTMLInputElement }) => {
    if (target.name === "number") {
      target.value = formatCreditCardNumber(target.value);
      updateFields({ creditCardNumber: target.value });
    }
    if (target.name === "date") {
      target.value = formatExpirationDate(target.value);
      updateFields({ errorMessage: "" });
      updateFields({ expirationDate: target.value });
    }
  };

  return (
    <div>
      <FormWrapper title="Detalles del pago">
        <label>Número de tarjeta</label>
        <input
          autoFocus
          className="border-l-2 border-l-kym3 pl-2 shadow-md"
          required
          name="number"
          pattern="([0-9]+( [0-9]+)+)"
          type="string"
          placeholder="XXXX XXXX XXXX XXXX"
          maxLength={19}
          title="16 dígitos"
          value={creditCardNumber}
          onChange={(e) => handleInputChange({ target: e.target })}
        />

        <label>Nombre del titular</label>
        <input
          className="w-full border-l-2 border-l-kym3 pl-2 shadow-md"
          required
          type="text"
          placeholder="Titular de la tarjeta"
          pattern="^[a-zA-ZÀ-ÿ\u00f1\u00d1\s]{2,150}"
          title="No se permiten dígitos ni caracteres especiales."
          value={fullNamePayment}
          onChange={(e) => updateFields({ fullNamePayment: e.target.value })}
        />

        <label>CVV</label>
        <input
          className="border-l-2 border-l-kym3 pl-2 shadow-md"
          required
          type="tel"
          placeholder="Código de seguridad"
          maxLength={3}
          pattern="[0-9]{3}"
          title="El CVV sólo tiene 3 dígitos"
          value={CVV}
          onChange={(e) => updateFields({ CVV: e.target.value })}
        />

        <label>Fecha de vencimiento</label>
        <div className="m-0 h-6">
          <input
            className="w-full border-l-2 border-l-kym3 pl-2 shadow-md"
            required
            name="date"
            type="tel"
            pattern="^(0[1-9]|1[0-2])\/?([0-9]{2})$"
            placeholder="MM/YY"
            value={expirationDate}
            onChange={(e) => handleInputChange({ target: e.target })}
          />
          <label className="m-0 text-sm text-red-700">{errorMessage}</label>
        </div>
      </FormWrapper>
      <FormWrapper title="Dirección de facturación">
        <label>Dirección de facturación</label>
        <div>
          <input
            className="w-full border-l-2 border-l-kym3 pl-2 shadow-md"
            required
            id="iAddress"
            type="text"
            value={facturationAddress}
            onChange={(e) =>
              updateFields({ facturationAddress: e.target.value })
            }
          />
          <div className="items my-1 flex items-center justify-end gap-1">
            <input
              type="checkBox"
              onChange={(e) => updateFields({ facturationAddress: address })}
            />
            <label className=" text-sm text-gray-700">
              Usar dirección de envio
            </label>
          </div>
        </div>
      </FormWrapper>
    </div>
  );
};

export default PaymentGateway;
