import React, { PropsWithChildren } from 'react';

const FlexDisplay = React.memo(({children}: PropsWithChildren<{}>) => {
    return (<div style={{
        margin: "1em 0",
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-end'
    }}>
        {children}
    </div>)
})

export default FlexDisplay