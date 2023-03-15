import styled from "styled-components";

const CustomFormLabel = styled.label((props) => {
  if (props["aria-required"])
    return {
      "&:after": {
        content: `"*"`,
        color: "red",
      },
    };
});
export default CustomFormLabel;
