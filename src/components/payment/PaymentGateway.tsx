import { date, input } from "zod";
import { FormWrapper } from "./FormWrapper";
import { formatCreditCardNumber, formatExpirationDate } from "./utils";

type AddressData = {
  fullNamePayment: string;
  address: string;
  facturationAddress: string;
  creditCardNumber: string;
  CVV: string;
  errorMessage: string;
  addressCheckBox: boolean;
  expirationDate: string;
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
  addressCheckBox,
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

  const changeAddress = ({ target }: { target: HTMLInputElement }) => {
    updateFields({ addressCheckBox: target.checked });
    if (target.checked) updateFields({ facturationAddress: address });
  };

  return (
    <div>
      <FormWrapper title="Detalles del pago">
        <label className="relative block flex w-full flex-col">
          <span className="mb-3">Número de Tarjeta</span>
          <input
            className="peer w-full rounded-md border-2 border-gray-300 py-2 pl-12 pr-2 placeholder-gray-300"
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
        </label>
        <label className="relative flex w-full flex-col">
          <span className="mb-3">Nombre del Titular</span>
          <input
            className="peer rounded-md border-2 border-gray-300 py-2 pl-12 pr-2 placeholder-gray-300"
            required
            type="text"
            placeholder="Titular de la tarjeta"
            pattern="^[a-zA-ZÀ-ÿ\u00f1\u00d1\s]{2,150}"
            title="No se permiten dígitos ni caracteres especiales."
            value={fullNamePayment}
            onChange={(e) => updateFields({ fullNamePayment: e.target.value })}
          />
        </label>

        <label className="relative flex w-full flex-col">
          <span className="mb-3">CVV</span>
          <input
            className="peer w-full rounded-md border-2 border-gray-300 py-2 pl-12 pr-2 placeholder-gray-300"
            required
            type="tel"
            placeholder="Código de seguridad"
            maxLength={3}
            pattern="[0-9]{3}"
            title="El CVV sólo tiene 3 dígitos"
            value={CVV}
            onChange={(e) => updateFields({ CVV: e.target.value })}
          />
        </label>

        <div className="m-0 h-6">
          <label className="relative flex w-full flex-col">
            <span className="mb-3">Fecha de Vencimiento</span>
            <input
              className="peer w-full rounded-md border-2 border-gray-300 py-2 pl-12 pr-2 placeholder-gray-300"
              required
              name="date"
              type="tel"
              pattern="^(0[1-9]|1[0-2])\/?([0-9]{2})$"
              placeholder="MM/YY"
              value={expirationDate}
              onChange={(e) => handleInputChange({ target: e.target })}
            />
          </label>
          <label className="m-0 text-sm text-red-700">{errorMessage}</label>
        </div>
      </FormWrapper>
      <FormWrapper title="Dirección de facturación">
        <div>
          <label className="relative flex w-full flex-col">
            <span className="mb-3">Fecha de Vencimiento</span>
            <input
              className="peer w-full rounded-md border-2 border-gray-300 py-2 pl-12 pr-2 placeholder-gray-300"
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
                defaultChecked={addressCheckBox}
                onChange={(e) => changeAddress({ target: e.target })}
              />
              <label className=" text-sm text-gray-700">
                Usar dirección de envio
              </label>
            </div>
          </label>
        </div>
      </FormWrapper>
    </div>
  );
};

export default PaymentGateway;
