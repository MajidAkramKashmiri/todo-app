# Vroozi Style Guide

Find all the latest Vroozi fashion right here in this guide.

### Diagram
High level diagram of Purchasing Manager and Login web applications
![PMAN - Web](https://user-images.githubusercontent.com/17128262/109462185-f5b44280-7a17-11eb-8067-0931f9ab140a.png)


## Definitions

```
camelCase
PascalCase // Camel case with first letter capitalized.
snake_case
skewer-case
ALLCAPS
```

## Naming and formatting code

The following norms should be followed for new code. For existing code, use the prevailing style in a file or module, applying the following norms when reasonable.

Files should be saved in skewer-case. Many exceptions exist. Follow the convention established in the folder you are saving to.

Files should be ordered with the most important functions at the top and ancillary/sub functions lower down in the file. This aids readability by allowing the reader to grasp the broad strokes before getting lost in the details.

Use the [airbnb style guide](https://github.com/airbnb/javascript) for any details not covered in this style guide .

### Whitespace

Four spaces per logic level.

Indent one level for chained functions (`.then()`) and when breaking up a long expression.

No tabs.

No whitespace at the end of a line.

Unix-style linebreaks ('\n'), not Windows-style ('\r\n').

End files with a linebreak.

Place one space before opening parenthesis after a keyword.

Place no space between the argument list and the function name in function calls and declarations.

Place one space before the leading brace.

Place one space to either side of infix operators.
```
// bad
let a=c+b;

// good
let a = c + b;
```
### Line length

Generally try to avoid lines longer than 120 characters.

Break long conditions and put `&&` and `||` logical connectives in new line.

Break long parameter lists after a comma. You may place the first parameter on a new line. Always place closing parenthesis on a new line and indented at the level of the function call.

```
foo(
    bar && bar
    || biz && buzz,
    { id: '1234'}
);
```
### Control structures


```
if (...) {
}
else if (...) {
}
else {
}

switch (...) {
    case 1:
        ...
        break;
    case 2:
        ...
        break;
    case 3:
        // Always comment if no break is intentional between cases
    case 4:
        ...
        break;
    default:
}

try {
}
catch (...) {
}

for (...; ...; ...) {
}
```

### Literals

Use single-quotes for strings. (This includes `'use strict';`.)

Use angular-translate for localization for any text that users will see. 
In Javascript:
```
this.$translate.instant('common.label.not_available');
```
In HTML:
```
{{ 'common.label.not_available' | translate }}
```

Use string template literals when line breaks are needed in a string or when joining strings with variables or expressions.

```
const food = 'fish';
console.log(`So long and thanks for all the
${food}!`); // Use template literas when you need a line break
```

### Typecasting and Initialization

Avoid `Number(someVariable)` and `ParseInt(someVariable, 10)` and `ParseFloat(someVariable)`

Floating Point: `+someVariable`

Integer: `someVariable | 0`

Use default initializers for optional parameters `function foo(someOptionalParam = 'hello world') { ... }`

### Variables

No use of `var`.

Use `const` for all references.

Use `let` if you must reassign a reference.

### Constants and Enums

Try to avoid using string literals, instead try put them into enumerations.

Should be declared with `const`.

PascalCase names. ALL_CAPS is ok for primitive data types, but not preferred.

camelCase keys. ALL_CAPS is ok too, but not preferred.

Values should match key if the enumeration is used for internal purposes.

Use Object.freeze to prevent mutation of properties.

```
export const InvoiceStatuses = {
    Approved: 'APPROVED',
    Coding: 'CODING',
    ...
};
Object.freeze(InvoiceStatuses);
```

### Objects

Use property value shorthand.

Dangling comma on last line.

> Why? It reduces noise in git diff by not flagging the line as changed when you add a new property.

Only quote properties that are invalid identifiers.

Prefer the object spread operator `...` over `Object.assign`.

Order properties alphabetically. Properties may be arranged into logical groups, where each group's properties are alphabetically ordered.

```
const buzz = 'hello world';
const foo = {
    buzz, // property value shorthand
    'this property should be quoted': (baz) => {
        ...
    }, // Dangling comma
};
```

### Arrays

Use array spreads `...` to copy arrays.
```
const myArray = [1, 2, 3];
const yourArray = [...myArray, 4, 5, 6];
```

To check if variable holding arrays is defined use `Array.isArray(arr)`

Prefer functional approach to check, process or project arrays using `some`, `every`, `filter`, `map`, `reduce` and `forEach`.

### Functions

Function names should be camelCase.

Use function declarations and not function expressions.

> Why? Function declarations are hoisted. This aids readability by allowing key functions to be placed at the top of the file and smaller sub-functions and helper functions to be placed lower in the file.

Anonymous functions should use arrow function syntax.

Use object method shorthand.

```
const buzz = 'hello world';
const foo = {
    buzz,
    bar: (baz) => {
        ...
    },
};

function helloWorld() {
    return buzz;
}
```

Pass `void 0` for optional arguments for which you want to use default values.
```
function foo(arg1, arg2 = true, arg3 = 0) {
    ...
}

foo('value', void 0, 5);
```

### Classes

Use PascalCase for class names.

Use property initializer syntax.

Use object method shorthand.

```
class VziSomeGreatThing {
    bar = 'hello';
    foo = 'world';
   
    constructor(AnotherService, SomeService) 
        this.AnotherService = AnotherService;
        this.SomeService = SomeService;
    }

    buzz() {
        ...
    }
}
```

## Documentation

### JSDoc

Use [JSDoc](http://usejsdoc.org/) style comments to document functions, classes, and complex types.

### Document resolved value of @return {promise}

```
// good
/**
 * @returns {promise.sometype} -- text to describe it here
 **/

// also good
/**
 * @return {promise}
 * @resolves {sometype} -- text to describe it here
 * @rejects {someType} -- omg!
 **/
```

## General Practices


### Pull request mergeability requirements

Each pull request is pre-populated with a template. Each section of the template must be completed before the pull request will be merged.

* *JIRA:* Paste in a complete URL to all JIRA tickets addressed by this pull request
* *Related PRs:* Paste in complete URL to all related pull requests. This includes pull requests for related back end changes and identical pull requests for different branches (Such as integration and RC)
* *Definition of Done Checklist:* Each one of the lines here must be checked. This list is a helpful reminder to be reviewed and completed with each pull request.
    * *One or more reviews requested* Always assign a reviewer. This will notify them on github. At least one Sr. dev should be assigned. Assign other devs that you believe should be aware of the changes made or have significant domain knowledge and would be helpful to receive a review from.
    * *Assigned to Sr. dev for merge:* This may be the same Sr. dev reviewer.
    * *Build completes successfully (gulp ci):* Always run `gulp ci` locally to verify that all tests pass and the build process completes successfully.
    * *QA passed on feature branch OR this PR is not targeting integration branch* to make sure QA passes ticket first before merging PR into the integration branch
    * *Code formatting consistent with Vroozi Style Guide:* We didn't write this document for nothing! Install eslint to your IDE. This will help a lot in keeping your code consistent with the style guide.
    * *Unit tests updated OR don't need to be updated:* One of these must be checked. If your changes are all server side or HTML/CSS, then check the second box ("OR don't need to be updated"). All angular code needs unit test coverage. When updating legacy angular code, you may need to create the unit test files.
    * *Screenshots provided OR neither html nor styling changed:* Any changes that may impact the visual presentation or responsivness of the view layer need to include screen shots for each of the major platform form factors - Mobile (iPhone 8, 375x667), Tablet (iPad, 1024x768), Desktop (Laptop with HDMI Screen, 1440x900). Use Chrome's dev tool "Device Toolbar" and "Capture Screenshot" menu option to create these screen shots.
    * *Ops notified of Configuration changes OR no configuration changes:* If there are any configuration changes or scripts to be run on deployment, be sure to post to the DevOps Slack channel and mention someone form DevOps on the JIRA ticket, and that they have acknowledged.

![Complete the PR Template!](https://github.com/vroozi/vroozi-style-guide/raw/master/img/pull-request-example.png "Complete the PR Template!")

![Taking Screenshots](https://github.com/vroozi/vroozi-style-guide/raw/master/img/screenshot-example.png "Taking Screenshots")

Feature branches should be merged using the "Squash Commit" option.

Long running feature branches consisting of work completed for many different JIRA tickets should instead use a normal "Merge Commit".

After merging, feature branches should be deleted immediately.

#### Resolving conflicts when backmerging the branches
Make sure `RC-branch` (e.g. `RC-202001-1`) and `integration` have the latest changes. 
1. Checkout RC branch: `git checkout RC-branch`
2. Checkout temporary sync branch: `git checkout -b RC-branch_integration`
3. Merge temporary branch with integration branch: `git merge integration`
4. Resolve conflicts
5. Commit changes: `git commit`
6. Push changes: `git push -u origin HEAD`
7. Create PR and merge using regular merge into integration (https://github.com/vroozi/purchasing-manager/compare/RC-branch_integration?expand=1, or use `git request-pull` to generate PR url), name it **Sync RC-branch-> integration** and clear description
8. Merge PR using regular merge and delete temporary branch `RC-branch_integration`

Note: You can pull the latest changes for integration branch using `git fetch origin integration:integration`, even if you are not checked-out in given branch.

### Unit tests

Ensure spec coverage on all new api.

### Angular injected params

Split inject params into three lines - Angular native (`$` prefix) on one line, all normal injectables on a second, custom injectables that require explicit 'resolve' functions should go on a third.

Don't split long param lines (let your IDE word wrap).

Order params alphabetically.

Use `'ngInject';` string statement pragma, not comment.

```
constructor(
    $log, $q, $scope, $timeout, $uibModalInstance,
    ApplicationData, Common, ConfigService, JsonPatch,  SweetAlert, Ut,
    options
) {
    'ngInject';
    ...
```

### Angular bindings

Bindings  should be ordered by required/optional and then alphabetically.

```
// bad
{
    bindings: {
        items: '<',
        viewCallback: '&?',
        queryParams: '<?',
        totalCount: '<',
        toggleCallback: '&?',
    }
}

// good
{
    bindings: {
        items: '<',
        totalCount: '<',
        queryParams: '<?',
        toggleCallback: '&?',
        viewCallback: '&?',
    }
}
```

### Common Angular Practices

Use `Autobind` in services

Use `Common.handleHttpResponse` for all `$http` requests. Use the same response handler for both success and failure of the request.

```
const TEXT_RESOURCES = Object.freeze({
   'fizzbuzz.error': 'Sorry, but fizz couldn\'t buzz.',
});

export class MyService {
    constructor($http, Autobind, Common) {
        'ngInject';
        Autobind(this);

        this.$http = $http;
        this.Common = Common;
    }

    getFizzBuzz(num) {
        const responseHandler = this.Common.handleHttpResponse(TEXT_RESOURCES['fizzbuzz.error'], true, false, true);
        return this.$http.get(`api/fizz-buzz/${num}`)
            .then(responseHandler, responseHandler);
    }
}
```

#### Ordering and placing HTML attributes
Ordering rules when structuring the html from to the bottom:
* Angular specific attributes that determines if element should be rendered (e.g. `ng-repeat`, `ng-if`, `ng-show`, ...)
* HTML standard attributes
    * Attribute `id`
    * Attribute `data-aut-id`
    * Other attributes (e.g. `title`, data attributes)
    * Attribute `class`
* Other angular specific attributes
    * Use `ng-class` if applicable (the idea is to keep `class` and `ng-class` to be adjacent)
    * Directives that determine the existence of an element (e.g. `ng-if`, `ng-repeat`)
    * Use `ng-model` if applicable
    * Directives that determine visibility of the element (e.g. `ng-show`, `ng-hide` )
    * Directives that define interaction behaviors (e.g. `ng-click`)
    * Custom directives (e.g. `vzi-focus`)
    * Directives that affect the rendering the node content (e.g. `ng-switch`, `ng-include`)

Notes: 
* When ordering Angular specific attributes please consider also the priority (ideally at the top should be the directives with the highest priority, e.g. `ng-repeat` has priority `1000`, `ng-if` has priority `600`).
* Normally all attributes should on it's own line, the only exception are the directive bindings. For example if we want to use directive `vzi-focus` together with it's bindings `vzi-focus-lazy` and `vzi-focus-selector`, they can be defined on the same line.

Example:
```
<div
    ng-if="!$ctrl.isFormSubmitted"
    id="new_customer-form"
    title="{{:: 'common.labels.title' | translate }}"
    class="form__section"
    ng-class="[
        $ctrl.cssClasses,
        { 'form__section--valid': $ctrl.form.$valid },
    ] "
>
    <input
        id="first_name"
        type="text"
        required
        ng-model="$ctrl.firstName"
        ng-change="$ctrl.synchronizeModel()"
        vzi-focus="$ctrl.signalFirstNameFocus" vzi-focus-lazy="true"
    >
</div>
```

Inspired by [AngularJS Pro-Tip: Be Mindful Of HTML Attribute Ordering](https://www.bennadel.com/blog/2761-angularjs-pro-tip-be-mindful-of-html-attribute-ordering.htm)

### Localization

[Full documentation](https://smartoci.atlassian.net/wiki/spaces/engineering/pages/1114505275/Front-End+Best+Practices+for+Externalization+of+Text)

For localization, in JS use `$translate` service and in template use `translate` filter (use normally one time binding).

Example:
```
const translation = $translate.instant('common.labels.street', {streetNumber, streetName});
```

```
{{:: 'common.labels.first_name' | translate }}
```

#### Resource definition

Define new translation in the most logical placeholder (e.g. if resource is only specific for concrete page use `page.page-name` placeholder, if it related to navigation tabs use `navigation.sections` placeholder, etc.). Try to reuse resource if that makes sense.

Example:
```
{
    "common": {
        "labels": {
            "street": "{{streetNumber}} {{streetName}}"
        }
    }
}
```

#### Naming convention

Concatenate words with `_`, if key name contains multiple words.
Use `-` when referencing real values, like component name or backend value. If you are defining resources for component, try to use suffix to indicate what given resource represents.

Examples:
`page.page-name.asn_number.label`, `page.page-name.asn_number.help_text`.

### Hidden properties

Use the `$$` prefix on any properties that shouldn't be sent back to the server. Angular automatically removes these properties anytime the object is serialized via angular.toJson (which is used under the hood by the $http service).
 
### Automation Ids

Automation Ids or `aut-ids` refer to the unique hooks found on the components that enable the automation processes. Please note that the assigned Ids per view should be unique. The conventions being followed to add `aut-ids` are stated below:

* To begin with you need to add the context of your view/component in the automationIdentifier.js file found under the path `/vzi.pipes/src/filters/automationIdentifier.js`.

> Context uniquely specifies to a particular view e.g. `purchase-request-items` refers to the view `vzi-purchase-request-items.html`.

* The context string should be added as a *key/value* pair under the **`AutomationContext`** variable, please note that the key should be the camel Case of the value.

> Automation Identifier pipe requires you to hook an object containing a *key*, *tag* and *context* as **`params`** that will be passed to the pipe and will be used to build the automation identifier string as the following pattern:
>  **`{ automationPrefix }-{AutomationContext}-{tag}-{key}({-{index}}?)`*
> Please note that the *index* here is optional and is only for the repeating templates within the dom.

  

* Here is an example of a `data-aut-id` hooked to an element:

`data-aut-id="{{:: 'comments' | automationId: {context: 'vziInvoiceForm', tag: 'input'} }}"`
The equivalent id would be as ` data-aut-id ="vzi-invoice-form_input_comments"`

* `'comments'` states the unique key.
* `automationId` refers to the pipe name.
* `context: 'vziInvoiceForm'` refers to the context key of the view/component that will refer to the value string you placed under the *AutomationContext* variable within `automationIdentifier.js`.
* `tag: 'input'` refers to the nature of the tag, It doesn't explicitly mean the actual tag upon which the identifier is hooked. Anything that refers to an input whether it is a `radio button`, `checkbox`, `input` , `textarea` or any wrapper component made over these native elements should be specified with a `input` tag.
* `tag: 'button'` refers to the native button elements or any wrapper component made over it. This will also include icon button or floating buttons.
* `tag: 'link'` refers to a the anchor tags or any wrapper component.
* `tag: 'text'` refers to text enclosing tags such as `<p>`, `<span>` etc.
* `tag: 'component'` refers to any component that doesn't have an obvious nature.
    `purchase-doc-address` is a component that displays a specific formatted address, a suffix of `component` can be added under the `AutomationContext` to keep track of such components.
* `index: $index` can be optionally added for **`ng-repeat`**.
