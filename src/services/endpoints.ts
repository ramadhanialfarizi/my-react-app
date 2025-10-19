export const ENDPOINTS = { 
    GET_ALLL_EVENTS: '/events',
    GET_EVENT_BY_ID: (id: string) => `/events/:${id}`,
}