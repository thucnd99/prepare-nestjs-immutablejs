import { Form } from "antd"
import { Field } from "formik";
import styled from "styled-components";

const CustomFormikField = styled(Field)`
    width: 100%;
    margin: 1em 0;
    padding: 1em;
    border-radius: 10px;
    border: 1px solid #7e827f;
    box-sizing: border-box;
`

export default CustomFormikField;