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
  return (
    <div>
      <FormWrapper title="Detalles del pago">
        <label>Número de tarjeta</label>
        <input
          className="border-l-2 border-l-kym3 pl-2 shadow-md"
          required
          pattern="[0-9]{16}"
          type="string"
          placeholder="XXXX XXXX XXXX XXXX"
          title="El formato de la tarjeta debe ser de tipo: XXXX-XXXX-XXXX-XXXX"
          value={creditCardNumber}
          onChange={(e) => updateFields({ creditCardNumber: e.target.value })}
        />

        <label>Nombre del titular</label>
        <input
          className="w-full border-l-2 border-l-kym3 pl-2 shadow-md"
          autoFocus
          required
          type="text"
          value={fullNamePayment}
          onChange={(e) => updateFields({ fullNamePayment: e.target.value })}
        />

        <label>Fecha de vencimiento</label>
        <input
          className="border-l-2 border-l-kym3 pl-2 shadow-md"
          required
          type="month"
          value={expirationDate}
          onChange={(e) => updateFields({ expirationDate: e.target.value })}
        />

        <label>CVV</label>
        <input
          className="border-l-2 border-l-kym3 pl-2 shadow-md"
          required
          type="text"
          placeholder="Código de seguridad"
          pattern="[0-9]{3}"
          title="El CVV solo tiene 3 numeros"
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
