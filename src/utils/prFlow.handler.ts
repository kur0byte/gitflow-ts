import inquirer from 'inquirer';

interface IfeaturePullRequestDescription {
    title: string;
    what: string;
    why: string;
    how: string;
    testing: string;
    anythingElse: string;
}
    
export async function featurePullRequestInputs(branch: string) {
    const featurePr: IfeaturePullRequestDescription = await inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'Title of the pull request',
            default: branch
        },
        {
            type: 'input',
            name: 'what',
            message: 'What is the purpose of this pull request? (what)',
        },
        {
            type: 'input',
            name: 'why',
            message: 'Why is this change necessary? (why)'
        },
        {
            type: 'input',
            name: 'how',
            message: 'How does it address the issue? (how)'
        },
        {
            type: 'input',
            name: 'testing',
            message: 'How has this been tested? (testing)'
        },
        {
            type: 'input',
            name: 'anythingElse',
            message: 'Anything else?'
        }
    ]);
    const title = featurePr.title;
    const description = `
    ## What?
    ${featurePr.what}
    
    ## Why?
    ${featurePr.why}
    
    ## How?
    ${featurePr.how}
    
    ## Testing?
    ${featurePr.testing}
    
    ## Anything Else?
    ${featurePr.anythingElse}`
    return {title, description};
}