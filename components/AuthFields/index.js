import React from 'react';
import PropTypes from 'prop-types';

const AuthFields = props => {
  const {
    selectFields,
    fields,
    handleTouch,
    handleChange,
    handleSubmit,
    touched,
    errors
  } = props;
  const mapFields = fields.map(field =>
    <div key={field.key}>
      <input
        name={field.attr.name}
        type={field.attr.type}
        placeholder={field.attr.label}
        onChange={handleChange}
        onFocus={handleTouch}
      />
      {errors &&
        <div>
          {errors[field.attr.name]}
        </div>}
    </div>
  );
  const authMethod =
    (selectFields === 'signinFields' && 'Sign In') || 'Sign Up';
  return (
    <main>
      <h1>
        {authMethod}
      </h1>
      <form>
        {mapFields}
        <br />
        <button onClick={handleSubmit} touched={touched} disabled={!touched}>
          {authMethod}
        </button>
      </form>
    </main>
  );
};

AuthFields.propTypes = {
  selectFields: PropTypes.string.isRequired,
  fields: PropTypes.array.isRequired,
  handleTouch: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  touched: PropTypes.bool.isRequired,
  errors: PropTypes.object.isRequired
};

export default AuthFields;
