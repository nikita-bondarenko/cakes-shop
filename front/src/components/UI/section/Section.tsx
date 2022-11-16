import React, {ComponentElement, ReactNode} from 'react';

interface Props {
    children: ReactNode | ComponentElement<any, any>,
    className?: string
}

const Section = ({children, className}: Props) => {
    return (
        <section className={className} style={{padding: '20px 0 40px'}}>
            {children}
        </section>
    );
};

export default Section;