export const DICTIONARY_KEY_TYPES = {
  /**
   * Required properties:
   * - `label`
   *
   * Optional properties:
   * - `isRendering` (Provided by the constant props)
   * - `conditionalRender`
   *
   *    Usage example:
   *
   *    When the value of client_id is null
   *
   *    And when is_admin is equal to false it is going to render
   *
   *    When it dosent render it gets the value of `resetValue`
   *
   * ```js
   *    conditionalRender: {
   *      conditions: [
   *       {
   *         render: true, // Render or not when the condition is true
   *         constantKey: 'client_id', // Constant property to compare
   *         constantKeyValue: null, // Value that needs to have that property
   *         isKeyValueAnArray: false // To get easier the check if is within an array
   *       },
   *       {
   *         render: true, // Render or not when the condition is true
   *         constantKey: 'is_admin', // Constant property to compare
   *         constantKeyValue: false, // Value that needs to have that property
   *         isKeyValueAnArray: false // To get easier the check if is within an array
   *       },
   *      ],
   *     resetValue: false
   *    }
   * ```
   */
  TEXT: "text",

  /**
   * Required properties:
   * - `label`
   *
   * Optional properties:
   * - `isRendering` (Provided by the constant props)
   * - `conditionalRender`
   *
   *    Usage example:
   *
   *    When the value of client_id is null
   *
   *    And when is_admin is equal to false it is going to render
   *
   *    When it dosent render it gets the value of `resetValue`
   *
   * ```js
   *    conditionalRender: {
   *      conditions: [
   *       {
   *         render: true, // Render or not when the condition is true
   *         constantKey: 'client_id', // Constant property to compare
   *         constantKeyValue: null, // Value that needs to have that property
   *         isKeyValueAnArray: false // To get easier the check if is within an array
   *       },
   *       {
   *         render: true, // Render or not when the condition is true
   *         constantKey: 'is_admin', // Constant property to compare
   *         constantKeyValue: false, // Value that needs to have that property
   *         isKeyValueAnArray: false // To get easier the check if is within an array
   *       },
   *      ],
   *     resetValue: false
   *    }
   * ```
   */
  NUMBER: "number",

  /**
   * Required properties:
   * - `label`
   *
   * Optional properties:
   * - `isRendering` (Provided by the constant props)
   * - `conditionalRender`
   *
   *    Usage example:
   *
   *    When the value of client_id is null
   *
   *    And when is_admin is equal to false it is going to render
   *
   *    When it dosent render it gets the value of `resetValue`
   *
   * ```js
   *    conditionalRender: {
   *      conditions: [
   *       {
   *         render: true, // Render or not when the condition is true
   *         constantKey: 'client_id', // Constant property to compare
   *         constantKeyValue: null, // Value that needs to have that property
   *         isKeyValueAnArray: false // To get easier the check if is within an array
   *       },
   *       {
   *         render: true, // Render or not when the condition is true
   *         constantKey: 'is_admin', // Constant property to compare
   *         constantKeyValue: false, // Value that needs to have that property
   *         isKeyValueAnArray: false // To get easier the check if is within an array
   *       },
   *      ],
   *     resetValue: false
   *    }
   * ```
   */
  CHECKBOX: "checkbox",

  /**
   * Required properties:
   * - `label`
   *
   * Optional properties:
   * - `isRendering` (Provided by the constant props)
   * - `conditionalRender`
   *
   *    Usage example:
   *
   *    When the value of client_id is null
   *
   *    And when is_admin is equal to false it is going to render
   *
   *    When it dosent render it gets the value of `resetValue`
   *
   * ```js
   *    conditionalRender: {
   *      conditions: [
   *       {
   *         render: true, // Render or not when the condition is true
   *         constantKey: 'client_id', // Constant property to compare
   *         constantKeyValue: null, // Value that needs to have that property
   *         isKeyValueAnArray: false // To get easier the check if is within an array
   *       },
   *       {
   *         render: true, // Render or not when the condition is true
   *         constantKey: 'is_admin', // Constant property to compare
   *         constantKeyValue: false, // Value that needs to have that property
   *         isKeyValueAnArray: false // To get easier the check if is within an array
   *       },
   *      ],
   *     resetValue: false
   *    }
   * ```
   */
  DATE: "date",

  /**
   * Required properties:
   * - `label`
   *
   * Optional properties:
   * - `isRendering` (Provided by the constant props)
   * - `conditionalRender`
   *
   *    Usage example:
   *
   *    When the value of client_id is null
   *
   *    And when is_admin is equal to false it is going to render
   *
   *    When it dosent render it gets the value of `resetValue`
   *
   * ```js
   *    conditionalRender: {
   *      conditions: [
   *       {
   *         render: true, // Render or not when the condition is true
   *         constantKey: 'client_id', // Constant property to compare
   *         constantKeyValue: null, // Value that needs to have that property
   *         isKeyValueAnArray: false // To get easier the check if is within an array
   *       },
   *       {
   *         render: true, // Render or not when the condition is true
   *         constantKey: 'is_admin', // Constant property to compare
   *         constantKeyValue: false, // Value that needs to have that property
   *         isKeyValueAnArray: false // To get easier the check if is within an array
   *       },
   *      ],
   *     resetValue: false
   *    }
   * ```
   */
  MONTHLY_FIRST_DAY_DATE: "monthlyFisrtDayDate",

  /**
   * Required properties:
   * - `label`
   *
   * Optional properties:
   * - `isRendering` (Provided by the constant props)
   * - `conditionalRender`
   *
   *    Usage example:
   *
   *    When the value of client_id is null
   *
   *    And when is_admin is equal to false it is going to render
   *
   *    When it dosent render it gets the value of `resetValue`
   *
   * ```js
   *    conditionalRender: {
   *      conditions: [
   *       {
   *         render: true, // Render or not when the condition is true
   *         constantKey: 'client_id', // Constant property to compare
   *         constantKeyValue: null, // Value that needs to have that property
   *         isKeyValueAnArray: false // To get easier the check if is within an array
   *       },
   *       {
   *         render: true, // Render or not when the condition is true
   *         constantKey: 'is_admin', // Constant property to compare
   *         constantKeyValue: false, // Value that needs to have that property
   *         isKeyValueAnArray: false // To get easier the check if is within an array
   *       },
   *      ],
   *     resetValue: false
   *    }
   * ```
   */
  MONTHLY_LAST_DAY_DATE: "monthlyLastDayDate",

  /**
   * Required properties:
   * - `label`
   *
   * Optional properties:
   * - `isRendering` (Provided by the constant props)
   * - `conditionalRender`
   *
   *    Usage example:
   *
   *    When the value of client_id is null
   *
   *    And when is_admin is equal to false it is going to render
   *
   *    When it dosent render it gets the value of `resetValue`
   *
   * ```js
   *    conditionalRender: {
   *      conditions: [
   *       {
   *         render: true, // Render or not when the condition is true
   *         constantKey: 'client_id', // Constant property to compare
   *         constantKeyValue: null, // Value that needs to have that property
   *         isKeyValueAnArray: false // To get easier the check if is within an array
   *       },
   *       {
   *         render: true, // Render or not when the condition is true
   *         constantKey: 'is_admin', // Constant property to compare
   *         constantKeyValue: false, // Value that needs to have that property
   *         isKeyValueAnArray: false // To get easier the check if is within an array
   *       },
   *      ],
   *     resetValue: false
   *    }
   * ```
   */
  HOURLY_DATE: "hourlyDate",

  /**
   * Required properties:
   * - `label`
   * - `array`
   *
   * Optional properties:
   * - `isRendering` (Provided by the constant props)
   * - `conditionalRender`
   *
   *    Usage example:
   *
   *    When the value of client_id is null
   *
   *    And when is_admin is equal to false it is going to render
   *
   *    When it dosent render it gets the value of `resetValue`
   *
   * ```js
   *    conditionalRender: {
   *      conditions: [
   *       {
   *         render: true, // Render or not when the condition is true
   *         constantKey: 'client_id', // Constant property to compare
   *         constantKeyValue: null, // Value that needs to have that property
   *         isKeyValueAnArray: false // To get easier the check if is within an array
   *       },
   *       {
   *         render: true, // Render or not when the condition is true
   *         constantKey: 'is_admin', // Constant property to compare
   *         constantKeyValue: false, // Value that needs to have that property
   *         isKeyValueAnArray: false // To get easier the check if is within an array
   *       },
   *      ],
   *     resetValue: false
   *    }
   * ```
   *
   * - `optionViewer`
   *
   *    Usage example:
   *
   *    For default the options are rendered as option.name
   *
   *    Here we want to render option[client][name]- -text- -option[enumeration]
   *
   * ```js
   *    optionViewer: {
   *      props: [['client', 'name'], 'text', ['enumeration']],
   *      propsJoiner: "- -" // This is used to join the values
   *    }
   * ```
   *
   * - `filterArrayKey`
   *
   *    Usage example:
   *
   *    It is going to filter the towns array with the ones that have the state_id value of the const
   * ```js
   *    town_id: {
   *      label: 'Municipio',
   *      type: DICTIONARY_KEY_TYPES.SELECT,
   *      array: towns,
   *      filterArrayKey: 'state_id'
   *    };
   * ```
   *
   * - `changeAnotherKey`
   *
   *    Usage example:
   *
   *    When you change the value of type_id, it is going to change categories_id to [ ]
   *
   * ```js
   *    changeAnotherKey: {
   *      constantKey: 'categories_id',
   *      value: []
   *    };
   * ```
   *
   */
  SELECT: "select",

  /**
   * Required properties:
   * - `label`
   * - `array`
   *    Usage example:
   *
   *    When the value of client_id is null
   *
   *    And when is_admin is equal to false it is going to render
   *
   *    When it dosent render it gets the value of `resetValue`
   *
   * ```js
   *    conditionalRender: {
   *      conditions: [
   *       {
   *         render: true, // Render or not when the condition is true
   *         constantKey: 'client_id', // Constant property to compare
   *         constantKeyValue: null, // Value that needs to have that property
   *         isKeyValueAnArray: false // To get easier the check if is within an array
   *       },
   *       {
   *         render: true, // Render or not when the condition is true
   *         constantKey: 'is_admin', // Constant property to compare
   *         constantKeyValue: false, // Value that needs to have that property
   *         isKeyValueAnArray: false // To get easier the check if is within an array
   *       },
   *      ],
   *     resetValue: false
   *    }
   * ```
   *
   * Optional properties:
   * - `isRendering` (Provided by the constant props)
   * - `conditionalRender`
   *
   *    Usage example:
   *
   *    When the value of client_id is null
   *
   *    And when is_admin is equal to false it is going to render
   *
   *    When it dosent render it gets the value of `resetValue`
   *
   * ```js
   *    conditionalRender: {
   *      conditions: [
   *       {
   *         render: true, // Render or not when the condition is true
   *         constantKey: 'client_id', // Constant property to compare
   *         constantKeyValue: null, // Value that needs to have that property
   *         isKeyValueAnArray: false // To get easier the check if is within an array
   *       },
   *       {
   *         render: true, // Render or not when the condition is true
   *         constantKey: 'is_admin', // Constant property to compare
   *         constantKeyValue: false, // Value that needs to have that property
   *         isKeyValueAnArray: false // To get easier the check if is within an array
   *       },
   *      ],
   *     resetValue: false
   *    }
   * ```
   *
   * - `optionViewer`
   *
   *    Usage example:
   *
   *    For default the options are rendered as option.name
   *
   *    Here we want to render option[client][name]- -text- -option[enumeration]
   *
   * ```js
   *    optionViewer: {
   *      props: [['client', 'name'], 'text', ['enumeration']],
   *      propsJoiner: "- -" // This is used to join the values
   *    }
   * ```
   *
   * - `filterArrayKey`
   *
   *    Usage example:
   *
   *    It is going to filter the towns array with the ones that have the state_id value of the const
   * ```js
   *    town_id: {
   *      label: 'Municipio',
   *      type: DICTIONARY_KEY_TYPES.SELECT,
   *      array: towns,
   *      filterArrayKey: 'state_id'
   *    };
   * ```
   *
   */
  SELECT_CONVERT_MULTISELECT: "selectConvertMultiSelect",

  /**
   * Required properties:
   * - `label`
   * - `array`
   *
   * Optional properties:
   * - `isRendering` (Provided by the constant props)
   * - `conditionalRender`
   *
   *    Usage example:
   *
   *    When the value of client_id is null
   *
   *    And when is_admin is equal to false it is going to render
   *
   *    When it dosent render it gets the value of `resetValue`
   *
   * ```js
   *    conditionalRender: {
   *      conditions: [
   *       {
   *         render: true, // Render or not when the condition is true
   *         constantKey: 'client_id', // Constant property to compare
   *         constantKeyValue: null, // Value that needs to have that property
   *         isKeyValueAnArray: false // To get easier the check if is within an array
   *       },
   *       {
   *         render: true, // Render or not when the condition is true
   *         constantKey: 'is_admin', // Constant property to compare
   *         constantKeyValue: false, // Value that needs to have that property
   *         isKeyValueAnArray: false // To get easier the check if is within an array
   *       },
   *      ],
   *     resetValue: false
   *    }
   * ```
   *
   * - `optionViewer`
   *
   *    Usage example:
   *
   *    For default the options are rendered as option.name
   *
   *    Here we want to render option[client][name]- -text- -option[enumeration]
   *
   * ```js
   *    optionViewer: {
   *      props: [['client', 'name'], 'text', ['enumeration']],
   *      propsJoiner: "- -" // This is used to join the values
   *    }
   * ```
   *
   * - `filterArrayKey`
   *
   *    Usage example:
   *
   *    It is going to filter the towns array with the ones that have the state_id value of the const
   * ```js
   *    town_id: {
   *      label: 'Municipio',
   *      type: DICTIONARY_KEY_TYPES.SELECT,
   *      array: towns,
   *      filterArrayKey: 'state_id'
   *    };
   * ```
   *
   */
  MULTISELECT: "multiSelect",
  MULTISELECTNOID: "multiSelectNoId",
  ARRAY_FIELDS: "arrayFields",
} as const;

export const twoDigitMonths = (month: number) =>
  month.toString().padStart(2, "0");
