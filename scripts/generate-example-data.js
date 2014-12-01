var contexts = [
    {
        product: 'app_intel_console_context',
        artifactType: "browser app",
        technologies: ['coffee'],
        teams: ['Security','Platform Automation'],
        testTypes: ['unit tests','system tests'],
        tags: ['partners','research']
    },
    {
        product: 'backup',
        artifactType: "service",
        technologies: ['ruby','java'],
        teams: ['Core Services','Platform Automation'],
        testTypes: ['unit tests','system tests'],
        tags: ['consumer']
    },
    {
        product: 'oraculum',
        artifactType: "library",
        technologies: ['coffee'],
        teams: ['Security','Platform Automation'],
        testTypes: ['unit tests','system tests'],
        tags: ['partners','research']
    },
    {
        product: 'research-console',
        artifactType: "browser app",
        technologies: ['coffee'],
        teams: ['Security','Platform Automation'],
        testTypes: ['unit tests','system tests'],
        tags: ['partners','research']
    },
    {
        product: 'security',
        artifactType: "library",
        technologies: ['java'],
        teams: ['Security','Platform Automation'],
        testTypes: ['unit tests','system tests'],
        tags: ['partners','research','consumer','enterprise']
    }
]

contexts.forEach(function(context) {
    context.tags.push('exampleData');
});


//generate multiple reports for each context. in each report, we will vary:
//environments
//dates
//complexities / coverages


//in order to do this, we need to get the right inputs for the given type of raw results which varies by app

