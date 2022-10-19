import { FormWrapper } from "./FormWrapper";

type AddressData = {
  firstName: string;
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
  firstName,
  address,
  facturationAddress,
  creditCardNumber,
  CVV,
  expirationDate,
  updateFields,
}: AddressFormProps) => {
  return (
    <FormWrapper title="Detalles del Pago">
      <label>Nombre y Apellidos</label>
      <input
        className="w-full border-l-2 border-l-kym3 shadow-md"
        autoFocus
        required
        type="text"
        value={firstName}
        onChange={(e) => updateFields({ firstName: e.target.value })}
      />

      <label>Dirección de Facturación</label>
      <div>
        <input
          className="w-full border-l-2 border-l-kym3 shadow-md"
          required
          id="iAddress"
          type="text"
          value={facturationAddress}
          onChange={(e) => updateFields({ facturationAddress: e.target.value })}
        />
        <div className="items my-1 flex items-center justify-end gap-1">
          <input
            className=""
            type="checkBox"
            onChange={(e) => updateFields({ facturationAddress: address })}
          />
          <label className=" text-sm text-gray-700">
            Usar dirección de envio
          </label>
        </div>
      </div>

      <label>Nº de Tarjeta de Crédito</label>
      <input
        className="border-l-2 border-l-kym3 shadow-md"
        required
        pattern="^4[0-9]{12}(?:[0-9]{3})?$"
        type="string"
        placeholder="XXXX XXXX XXXX XXXX"
        title="El formato de la tarjeta debe tener el formato XXXX-XXXX-XXXX-XXXX"
        value={creditCardNumber}
        onChange={(e) => updateFields({ creditCardNumber: e.target.value })}
      />

      <label>CVV</label>
      <input
        className="border-l-2 border-l-kym3 shadow-md"
        required
        type="text"
        pattern="[0-9]{3}"
        title="El CVV solo tiene 3 numeros"
        value={CVV}
        onChange={(e) => updateFields({ CVV: e.target.value })}
      />

      <label>Fecha de Expiración</label>
      <input
        className="border-l-2 border-l-kym3 shadow-md"
        required
        type="month"
        value={expirationDate}
        onChange={(e) => updateFields({ expirationDate: e.target.value })}
      />
    </FormWrapper>
  );
};

export default PaymentGateway;
