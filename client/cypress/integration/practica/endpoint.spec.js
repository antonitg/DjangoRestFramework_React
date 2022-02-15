
it('tests endpoints estació', () => {
    const authorization = `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjQ1ODAyMzg3LCJpYXQiOjE2NDQ5MzgzODcsImp0aSI6IjVhNzlkOGUyMWQxYzQ0NTliNWE4ODc3MWE0MTQ0Yzg4IiwidXNlcl9pZCI6MTd9.me_2iSyo-GLzNmD0_ID_UXy8w7yJiXtKYk-eOEcin08`;
    const options = {
        method: 'GET',
        url: `/api/v2/stations`,
        headers: {
          authorization,
        }};
  
      cy.request(options).its('status').should('eq', 200);
    })