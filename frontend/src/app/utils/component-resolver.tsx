import {createElement, lazy, ReactElement, Suspense} from 'react';
import Loader from '@/components/Common/Loader';

export default function componentResolver(section: any, index: number): ReactElement {
    const names: string[] = section.__component.split('.')
    const component = names[1]
    const parts: string[] = component.split('-')

    let componentName = ''

    parts.forEach(s => {
        componentName += capitalizeFirstLetter(s)
    })

    const moduleComponent = lazy(() => import( `../components/${componentName}`))
    const reactElement = createElement(moduleComponent, {data: section, key: index})

    return (
        <Suspense fallback={<Loader/>} key={index}>
            {reactElement}
        </Suspense>
    )
}

function capitalizeFirstLetter(s: string) {
    return s.charAt(0).toUpperCase() + s.slice(1);
}