import { Spin, SpinProps } from 'antd';
import React from 'react';
interface LoadingProps extends SpinProps {
}
const Loading: React.FC<LoadingProps> = (props: LoadingProps) => {
    return <Spin size={props.size} />
}

export default Loading;