/**
 * Movie Rental Application
 *
 * @category   Application_Frontend
 * @package    movie-rental-app
 * @author     Suman Barua
 * @developer  Suman Barua <sumanbarua576@gmail.com>
 */

/**
 * @category   Application_Frontend
 * @package    movie-rental-app
 */

import React, { Component } from "react";
import Joi from "@hapi/joi";
import Input from "./input";
import Select from "./select";

class Form extends Component {
  state = {
    data: {},
    errors: {}
  };

  // single input validation (on change)
  validateProparty = ({ name, value }) => {
    // using normal validation
    // let error = null;
    // if (!value.trim()) error = `The ${name} is required!`;
    // return error;

    // using Joi validation (Mosh way, better way)
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);

    // using Joi validation (My way)
    // const { error } = Joi.validate(value, this.schema[name]);
    return error ? error.details[0].message : null;
  };

  // all input validation (on submission)
  validate = () => {
    // using Joi validation
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.data, this.schema, options);

    //console.log(result);

    if (!error) return null;

    const errors = {};

    // using map method
    error.details.map(err => {
      errors[err.path[0]] = err.message;
      return errors;
    });

    // using for-of loop
    // for (let err of error.details) {
    //   errors[err.path[0]] = err.message;
    // }

    //console.log(errors);
    return errors;
  };

  // event object destructuring
  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProparty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data, errors });
  };

  // on submission
  handleSubmission = event => {
    event.preventDefault();

    const errors = this.validate();

    // const errors = this.validate();
    // this.setState({ errors });
    // if (Object.keys(errors).length) return;

    // if there is no error then call server

    this.setState({ errors });

    this.doSubmit();
  };

  renderInput(name, label, type = "text", autoFocus = false) {
    const { data, errors } = this.state;

    return (
      <Input
        autoFocus={autoFocus}
        type={type}
        name={name}
        label={label}
        error={errors ? errors[name] : ""}
        value={data[name]}
        onChange={this.handleChange}
      />
    );
  }

  renderSelect(name, label, options, autoFocus = false) {
    const { data, errors } = this.state;

    return (
      <Select
        name={name}
        label={label}
        options={options}
        value={data[name]}
        error={errors ? errors[name] : ""}
        autoFocus={autoFocus}
        onChange={this.handleChange}
      />
    );
  }

  renderButton(label) {
    return (
      <button disabled={this.validate()} className="btn btn-primary">
        {label}
      </button>
    );
  }
}

export default Form;
