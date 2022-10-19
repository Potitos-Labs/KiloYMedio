import { FormWrapper } from "./FormWrapper";

type AddressData = {
  firstName: string;
  surName: string;
  city: string;
  creditCardNumber: string;
  CVV: string;
  expirationDate: string;
};

type AddressFormProps = AddressData & {
  updateFields: (fields: Partial<AddressData>) => void;
};

const PaymentGateway = ({
  firstName,
  surName,
  city,
  creditCardNumber,
  CVV,
  expirationDate,
  updateFields,
}: AddressFormProps) => {
  return (
    <FormWrapper title="Detalles del Pago">
      <label>Nombre</label>
      <input
        className="w-full border-l-2 border-l-kym3 shadow-md"
        autoFocus
        required
        type="text"
        value={firstName}
        onChange={(e) => updateFields({ firstName: e.target.value })}
      />

      <label>Apellidos</label>
      <input
        className="border-l-2 border-l-kym3 shadow-md"
        required
        type="text"
        value={surName}
        onChange={(e) => updateFields({ surName: e.target.value })}
      />

      <label>Localidad</label>
      <input
        className="border-l-2 border-l-kym3 shadow-md"
        required
        type="text"
        value={city}
        onChange={(e) => updateFields({ city: e.target.value })}
      />

      <label>Numero de Tarjeta de Crédito</label>
      <input
        className="border-l-2 border-l-kym3 shadow-md"
        required
        type="text"
        value={creditCardNumber}
        onChange={(e) => updateFields({ creditCardNumber: e.target.value })}
      />

      <label>CVV</label>
      <input
        className="border-l-2 border-l-kym3 shadow-md"
        required
        type="text"
        value={CVV}
        onChange={(e) => updateFields({ CVV: e.target.value })}
      />

      <label>Fecha de Expiración</label>
      <input
        className="border-l-2 border-l-kym3 shadow-md"
        required
        type="text"
        value={expirationDate}
        onChange={(e) => updateFields({ expirationDate: e.target.value })}
      />
    </FormWrapper>
  );
};

export default PaymentGateway;
