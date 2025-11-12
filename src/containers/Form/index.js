import { useCallback, useState } from "react";
import PropTypes from "prop-types";
import Field, { FIELD_TYPES } from "../../components/Field";
import Select from "../../components/Select";
import Button, { BUTTON_TYPES } from "../../components/Button";

const mockContactApi = (payload, fail) => {
  const shouldFail = fail === true; // toujours un booléen
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail) {
        reject(new Error("Erreur"));
      } else {
        resolve(payload);
      }
    }, 500);
  });
};


const Form = ({ onSuccess, onError }) => {
  const [sending, setSending] = useState(false);
  const [contactType, setContactType] = useState(null);

  const sendContact = useCallback(
    async (evt) => {
      evt.preventDefault();
      setSending(true);
      try {
        // on envoie contactType à la "fake API"
        await mockContactApi(false, { contactType });
        setSending(false);
        onSuccess();
      } catch (err) {
        setSending(false);
        onError(err);
      }
    },
    [onSuccess, onError, contactType]
  );

  return (
    <form onSubmit={sendContact}>
      <div className="row">
        <div className="col">
          <Field placeholder="" label="Nom" />
          <Field placeholder="" label="Prénom" />

          <Select
            selection={["Personel", "Entreprise"]}
            onChange={setContactType}
            label="Personel / Entreprise"
            type="large"
            titleEmpty
          />

          {/* Affichage du type sélectionné pour vérifier le state */}
          {contactType && <div>Type sélectionné : {contactType}</div>}

          <Field placeholder="" label="Email" />
          <Button type={BUTTON_TYPES.SUBMIT} disabled={sending}>
            {sending ? "En cours" : "Envoyer"}
          </Button>
        </div>
        <div className="col">
          <Field
            placeholder="message"
            label="Message"
            type={FIELD_TYPES.TEXTAREA}
          />
        </div>
      </div>
    </form>
  );
};

Form.propTypes = {
  onError: PropTypes.func,
  onSuccess: PropTypes.func,
};

Form.defaultProps = {
  onError: () => null,
  onSuccess: () => null,
};

export default Form;
