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
        onInput={(e) => () => {
          console.log("EVENTO");
        }}
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
