import { date } from "zod";
import { FormWrapper } from "./FormWrapper";

type AddressData = {
  fullNamePayment: string;
  address: string;
  facturationAddress: string;
  creditCardNumber: string;
  CVV: string;
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
  updateFields,
}: AddressFormProps) => {
  const date = new Date();
  const minDate = date.getUTCFullYear() + "-" + (date.getUTCMonth() + 1);
  console.log(minDate);
  return (
    <div>
      <FormWrapper title="Detalles del pago">
        <label>Número de tarjeta</label>
        <input
          autoFocus
          className="border-l-2 border-l-kym3 pl-2 shadow-md"
          required
          pattern="4[0-9]{12}(?:[0-9]{3})?"
          type="string"
          placeholder="XXXXXXXXXXXXXXXX"
          maxLength={16}
          title="16 dígitos"
          value={creditCardNumber}
          onChange={(e) => updateFields({ creditCardNumber: e.target.value })}
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

        <label>Fecha de vencimiento</label>
        <input
          className="border-l-2 border-l-kym3 pl-2 shadow-md"
          required
          type="month"
          min={minDate}
          value={expirationDate}
          onChange={(e) => updateFields({ expirationDate: e.target.value })}
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
