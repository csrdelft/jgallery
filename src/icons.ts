import createElement from './utils/create-element/index';

const dot = (style: Partial<CSSStyleDeclaration> = {}) => createElement(
    `<span style="width: 1em; height: 1em; display: inline-block; background: #fff; margin: 1px"></span>`,
    { style }
);

export const iconEllipsisHorizontal = (style: Partial<CSSStyleDeclaration> =  {}) => createElement(`<span></span>`, {
    style: {
        display: 'inline-flex',
        cursor: 'pointer',
        width: '1em',
        height: '1em',
        verticalAlign: 'middle',
        alignItems: 'center',
        justifyContent: 'center',
        ...style,
    },
    children: [dot({ fontSize: '.2em' }), dot({ fontSize: '.2em' }), dot({ fontSize: '.2em' })]
});
