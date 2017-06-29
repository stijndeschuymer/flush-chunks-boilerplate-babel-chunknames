declare var __dirname;
declare var require;
import * as path from 'path';
import React from 'react';
import universal from 'react-universal-component';

const UniversalExample2 = universal(() => import(/* webpackChunkName: 'Example2' */ './Example2'), {
    path: path.resolve(__dirname, './Example2'),
    resolve: () => require.resolveWeak('./Example2'),
    chunkName: 'Example2',
    minDelay: 500
})

export const LazyRoute1 = () => (
    <div><UniversalExample2/></div>
)
