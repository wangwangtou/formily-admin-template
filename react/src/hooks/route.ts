import React, { useEffect, createContext, useContext } from 'react'

import {
    AgnosticRouteMatch,
    AgnosticRouteObject
} from '@remix-run/router/utils'

const defaultRoute: AgnosticRouteMatch<string, AgnosticRouteObject>[] = []
export const RouteContext = createContext(defaultRoute)

export function useRoute() {
    return useContext(RouteContext)
}