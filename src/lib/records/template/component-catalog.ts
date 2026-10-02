/**
 * Typed catalog of every reusable component in the template's
 * `src/components/ui`, `src/components/calendar` and `src/components/billing`
 * folders, grouped the same way as the template's component gallery.
 *
 * Exports, props and usage snippets are taken from the component source files;
 * keep this in sync when components are added, removed or renamed.
 */

export type CatalogGroupId =
  | "actions"
  | "forms"
  | "overlays"
  | "data-display"
  | "navigation"
  | "layout"
  | "motion"
  | "calendar"
  | "billing";

export type CatalogEntry = {
  /** Display name, e.g. "Dropdown menu". */
  name: string;
  /** File name inside its `src/components/*` folder, e.g. "dropdown-menu.tsx". */
  file: string;
  /** Import specifier, e.g. "@/components/ui/dropdown-menu". */
  importPath: string;
  /** Every exported component/hook/helper/type name in the file. */
  exports: string[];
  /** One or two plain sentences: what it is and when to use it. */
  description: string;
  /** Notable props only, from the real prop types. */
  props?: { name: string; type: string; description: string }[];
  /** True if the file has "use client" or relies on hooks/event handlers. */
  client: boolean;
  /** Notable third-party dependencies. */
  dependsOn?: string[];
  /** Short TSX usage snippet, imports included. */
  usage: string;
};

export type CatalogGroup = {
  id: CatalogGroupId;
  title: string;
  description: string;
  entries: CatalogEntry[];
};

export const COMPONENT_CATALOG: CatalogGroup[] = [
  /* ------------------------------------------------------------------ */
  /* Actions                                                             */
  /* ------------------------------------------------------------------ */
  {
    id: "actions",
    title: "Actions",
    description: "Buttons and compact action menus that trigger something when clicked.",
    entries: [
      {
        name: "Button",
        file: "button.tsx",
        importPath: "@/components/ui/button",
        exports: ["Button", "buttonVariants", "ButtonProps", "ButtonVariant"],
        description:
          "The base button with primary, secondary, ghost, destructive, outline and link variants plus a built-in loading state. Use `buttonVariants()` to give a link or other element the same look.",
        props: [
          {
            name: "variant",
            type: '"primary" | "secondary" | "ghost" | "destructive" | "outline" | "link"',
            description: 'Visual style. Defaults to "primary".',
          },
          {
            name: "loading",
            type: "boolean",
            description: "Swaps the children for a spinning loader and disables the button while an awaited request runs.",
          },
          { name: "disabled", type: "boolean", description: "Native disabled state." },
          { name: "...props", type: 'React.ComponentProps<"button">', description: "Any native button attribute." },
        ],
        client: false,
        dependsOn: ["@iconify/react"],
        usage: `import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";

<Button>Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="destructive">Delete</Button>
<Button loading={saving} onClick={save}>Save</Button>
<Link href="/dashboard" className={buttonVariants({ variant: "outline" })}>
  Go to dashboard
</Link>`,
      },
      {
        name: "Icon button",
        file: "icon-button.tsx",
        importPath: "@/components/ui/icon-button",
        exports: ["IconButton", "IconButtonProps"],
        description:
          'A square, icon-only button in three sizes. It defaults to the ghost variant and type="button", and requires an aria-label because it has no visible text.',
        props: [
          { name: "aria-label", type: "string", description: "Required accessible name." },
          { name: "icon", type: "string", description: 'Iconify icon name, e.g. "lucide:x". Omit to pass a custom icon as children.' },
          { name: "size", type: '"sm" | "md" | "lg"', description: 'Button and icon size. Defaults to "md".' },
          { name: "variant", type: "ButtonVariant", description: 'Any Button variant. Defaults to "ghost".' },
          { name: "iconClassName", type: "string", description: "Extra classes for the icon." },
        ],
        client: false,
        dependsOn: ["@iconify/react"],
        usage: `import { IconButton } from "@/components/ui/icon-button";

<IconButton aria-label="Add" icon="lucide:plus" size="sm" />
<IconButton aria-label="Edit" icon="lucide:pencil" />
<IconButton aria-label="Delete" icon="lucide:trash-2" size="lg" variant="destructive" />`,
      },
      {
        name: "Button group",
        file: "button-group.tsx",
        importPath: "@/components/ui/button-group",
        exports: ["ButtonGroup", "ButtonGroupText", "ButtonGroupSeparator", "buttonGroupVariants"],
        description:
          "Joins adjacent buttons, inputs or selects into one segmented control by removing the inner corners and doubled borders. Add a text segment for labels or units, or a separator between segments that would otherwise merge.",
        props: [
          {
            name: "orientation",
            type: '"horizontal" | "vertical"',
            description: 'Direction of the group (ButtonGroup). Defaults to "horizontal".',
          },
          {
            name: "asChild",
            type: "boolean",
            description: "ButtonGroupText only: render onto your own element, e.g. a <label>.",
          },
        ],
        client: false,
        dependsOn: ["@radix-ui/react-slot", "class-variance-authority"],
        usage: `import { Button } from "@/components/ui/button";
import { ButtonGroup, ButtonGroupSeparator, ButtonGroupText } from "@/components/ui/button-group";

<ButtonGroup>
  <Button variant="outline">Day</Button>
  <Button variant="outline">Week</Button>
  <Button variant="outline">Month</Button>
</ButtonGroup>

<ButtonGroup>
  <ButtonGroupText>Qty</ButtonGroupText>
  <Button variant="secondary">-</Button>
  <ButtonGroupSeparator />
  <Button variant="secondary">+</Button>
</ButtonGroup>`,
      },
      {
        name: "Back button",
        file: "back-button.tsx",
        importPath: "@/components/ui/back-button",
        exports: ["BackButton"],
        description:
          "A ghost button with a leading arrow. It navigates to `href` when given, otherwise it goes back one entry in browser history.",
        props: [
          { name: "href", type: "string", description: "Route to push. Omit to call router.back()." },
          { name: "children", type: "React.ReactNode", description: 'Button text. Defaults to "Back".' },
          { name: "variant", type: "ButtonVariant", description: 'Any Button variant. Defaults to "ghost".' },
        ],
        client: true,
        dependsOn: ["next", "@iconify/react"],
        usage: `import { BackButton } from "@/components/ui/back-button";

<BackButton />
<BackButton href="/dashboard">To dashboard</BackButton>`,
      },
      {
        name: "Submit button",
        file: "submit-button.tsx",
        importPath: "@/components/ui/submit-button",
        exports: ["SubmitButton"],
        description:
          "A submit Button that shows its loading state while the enclosing `<form action={...}>` is pending, via useFormStatus(). Use it for any Server Action form submit.",
        props: [
          {
            name: "...props",
            type: 'Omit<ButtonProps, "type" | "loading">',
            description: "Any Button prop except type and loading, which it controls.",
          },
        ],
        client: true,
        usage: `import { Input } from "@/components/ui/input";
import { SubmitButton } from "@/components/ui/submit-button";

<form action={saveAction} className="flex items-center gap-2">
  <Input name="title" placeholder="Title" />
  <SubmitButton>Save</SubmitButton>
</form>`,
      },
      {
        name: "Kebab menu",
        file: "kebab-menu.tsx",
        importPath: "@/components/ui/kebab-menu",
        exports: ["KebabMenu", "KebabMenuItem", "KebabMenuProps"],
        description:
          "A lightweight vertical-ellipsis menu for per-item actions, closing on outside click or Escape. An item can return a short string to flash as feedback; use DropdownMenu instead when you need full keyboard navigation.",
        props: [
          {
            name: "items",
            type: "{ label: string; icon?: string; onSelect: () => void | string | Promise<string | void> }[]",
            description: "Menu entries. Return a string from onSelect to show it as transient feedback.",
          },
          { name: "label", type: "string", description: 'Accessible label for the trigger. Defaults to "More options".' },
          { name: "align", type: '"start" | "end"', description: 'Which edge the menu aligns to. Defaults to "end".' },
          { name: "feedbackDurationMs", type: "number", description: "How long feedback stays visible. Defaults to 1500." },
        ],
        client: true,
        dependsOn: ["@iconify/react"],
        usage: `import { KebabMenu } from "@/components/ui/kebab-menu";

<KebabMenu
  items={[
    { label: "Copy link", icon: "lucide:link", onSelect: () => "Link copied" },
    { label: "Share", icon: "lucide:share", onSelect: () => "Shared" },
    { label: "Archive", icon: "lucide:archive", onSelect: () => undefined },
  ]}
/>`,
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  /* Forms                                                               */
  /* ------------------------------------------------------------------ */
  {
    id: "forms",
    title: "Forms",
    description: "Text fields, choice controls, pickers and multi-step form helpers.",
    entries: [
      {
        name: "Input",
        file: "input.tsx",
        importPath: "@/components/ui/input",
        exports: ["Input", "InputProps"],
        description:
          "A styled native text input on the muted surface. It is the base the other text fields build on.",
        props: [{ name: "...props", type: 'React.ComponentProps<"input">', description: "Any native input attribute." }],
        client: false,
        usage: `import { Input } from "@/components/ui/input";

<Input placeholder="Plain input" value={text} onChange={(e) => setText(e.target.value)} />
<Input placeholder="Disabled" disabled />`,
      },
      {
        name: "Textarea",
        file: "textarea.tsx",
        importPath: "@/components/ui/textarea",
        exports: ["Textarea"],
        description: "A styled native multi-line text field matching Input.",
        props: [
          { name: "...props", type: 'React.ComponentProps<"textarea">', description: "Any native textarea attribute." },
        ],
        client: false,
        usage: `import { Textarea } from "@/components/ui/textarea";

<Textarea placeholder="Write a message" rows={4} />`,
      },
      {
        name: "Input field",
        file: "input-field.tsx",
        importPath: "@/components/ui/input-field",
        exports: ["InputField", "InputFieldProps"],
        description:
          "An Input with an optional leading icon and a trailing slot for a button or hint. Use it for labelled-by-icon fields like email or search.",
        props: [
          { name: "leftIcon", type: "string", description: "Iconify icon name shown inside the left edge." },
          { name: "rightElement", type: "React.ReactNode", description: "Node placed inside the right edge." },
          { name: "iconClassName", type: "string", description: "Extra classes for the left icon." },
          { name: "rightClassName", type: "string", description: "Extra classes for the right slot wrapper." },
          { name: "...props", type: "InputProps", description: "Any Input prop; the ref is forwarded to the input." },
        ],
        client: false,
        dependsOn: ["@iconify/react"],
        usage: `import { InputField } from "@/components/ui/input-field";

<InputField leftIcon="mdi:email-outline" placeholder="Email" type="email" />`,
      },
      {
        name: "Password input field",
        file: "password-input-field.tsx",
        importPath: "@/components/ui/password-input-field",
        exports: ["PasswordInputField"],
        description:
          "An InputField for passwords with a lock icon and a show/hide toggle button.",
        props: [
          { name: "defaultVisible", type: "boolean", description: "Start with the password shown. Defaults to false." },
          { name: "leftIcon", type: "string", description: 'Leading icon. Defaults to "mdi:lock-outline".' },
          {
            name: "...props",
            type: 'Omit<InputFieldProps, "type" | "rightElement">',
            description: "Any InputField prop except type and rightElement.",
          },
        ],
        client: true,
        dependsOn: ["@iconify/react"],
        usage: `import { PasswordInputField } from "@/components/ui/password-input-field";

<PasswordInputField name="password" placeholder="Password" autoComplete="current-password" />`,
      },
      {
        name: "Search bar",
        file: "search-bar.tsx",
        importPath: "@/components/ui/search-bar",
        exports: ["SearchBar", "SearchBarProps"],
        description:
          "A search input with a trailing magnifier icon that turns into a clear button once there is a value. Works controlled or uncontrolled.",
        props: [
          {
            name: "onClear",
            type: "() => void",
            description: "Called when the clear button is pressed. Without it, onChange receives an empty value instead.",
          },
          { name: "clearLabel", type: "string", description: 'Accessible label for the clear button. Defaults to "Clear search".' },
          { name: "containerClassName", type: "string", description: "Classes for the outer wrapper." },
          { name: "...props", type: 'Omit<InputProps, "type">', description: "Any Input prop except type." },
        ],
        client: true,
        dependsOn: ["@iconify/react"],
        usage: `import { SearchBar } from "@/components/ui/search-bar";

<SearchBar placeholder="Search…" value={search} onChange={(e) => setSearch(e.target.value)} />`,
      },
      {
        name: "Input group",
        file: "input-group.tsx",
        importPath: "@/components/ui/input-group",
        exports: [
          "InputGroup",
          "InputGroupAddon",
          "InputGroupButton",
          "InputGroupText",
          "InputGroupInput",
          "InputGroupTextarea",
        ],
        description:
          "A single field surface that combines an input or textarea with addons such as icons, units, buttons or keyboard hints. Clicking an addon focuses the input.",
        props: [
          {
            name: "align",
            type: '"inline-start" | "inline-end" | "block-start" | "block-end"',
            description: 'InputGroupAddon: where the addon sits. Defaults to "inline-start".',
          },
          {
            name: "size",
            type: '"xs" | "sm" | "icon-xs" | "icon-sm"',
            description: 'InputGroupButton: button size. Defaults to "xs".',
          },
          { name: "variant", type: "ButtonVariant", description: 'InputGroupButton: any Button variant. Defaults to "ghost".' },
        ],
        client: true,
        dependsOn: ["class-variance-authority"],
        usage: `import { Icon } from "@iconify/react";
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "@/components/ui/input-group";

<InputGroup>
  <InputGroupAddon>
    <Icon icon="lucide:globe" aria-hidden="true" />
  </InputGroupAddon>
  <InputGroupInput placeholder="example.com" />
  <InputGroupAddon align="inline-end">
    <InputGroupButton variant="secondary">Go</InputGroupButton>
  </InputGroupAddon>
</InputGroup>

<InputGroup>
  <InputGroupInput placeholder="Amount" inputMode="decimal" />
  <InputGroupAddon align="inline-end">USD</InputGroupAddon>
</InputGroup>`,
      },
      {
        name: "Checkbox",
        file: "checkbox.tsx",
        importPath: "@/components/ui/checkbox",
        exports: ["Checkbox"],
        description: "An accessible checkbox that fills with the primary color when checked. Wrap it in a label for a clickable caption.",
        props: [
          { name: "checked", type: 'boolean | "indeterminate"', description: "Controlled checked state." },
          {
            name: "onCheckedChange",
            type: '(checked: boolean | "indeterminate") => void',
            description: "Called when the state changes.",
          },
          { name: "disabled", type: "boolean", description: "Disables the checkbox." },
        ],
        client: true,
        dependsOn: ["@radix-ui/react-checkbox", "@iconify/react"],
        usage: `import { Checkbox } from "@/components/ui/checkbox";

<label className="flex items-center gap-2 text-sm">
  <Checkbox checked={checked} onCheckedChange={(v) => setChecked(v === true)} />
  Email me updates
</label>`,
      },
      {
        name: "Radio group",
        file: "radio-group.tsx",
        importPath: "@/components/ui/radio-group",
        exports: ["RadioGroup", "RadioGroupItem"],
        description:
          "A controlled, keyboard-navigable group of round radios. Pair each item with a label using htmlFor.",
        props: [
          { name: "value", type: "string", description: "RadioGroup: the selected value." },
          { name: "onValueChange", type: "(value: string) => void", description: "RadioGroup: called with the new value." },
          { name: "defaultValue", type: "string", description: "RadioGroup: initial value when uncontrolled." },
          { name: "value (item)", type: "string", description: "RadioGroupItem: the value this item represents." },
        ],
        client: true,
        dependsOn: ["@radix-ui/react-radio-group"],
        usage: `import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

<RadioGroup value={density} onValueChange={setDensity}>
  <label htmlFor="density-default" className="flex items-center gap-2 text-sm">
    <RadioGroupItem id="density-default" value="default" />
    Default
  </label>
  <label htmlFor="density-compact" className="flex items-center gap-2 text-sm">
    <RadioGroupItem id="density-compact" value="compact" />
    Compact
  </label>
</RadioGroup>`,
      },
      {
        name: "Radio button",
        file: "radio-button.tsx",
        importPath: "@/components/ui/radio-button",
        exports: ["RadioButton"],
        description:
          "A native radio inside a bordered, full-width clickable card for option lists in plain forms; it works without JavaScript. Group options by giving them the same name.",
        props: [
          { name: "label", type: "React.ReactNode", description: "Text shown next to the radio." },
          { name: "name", type: "string", description: "Shared group name." },
          { name: "value", type: "string", description: "Submitted value." },
          { name: "...props", type: 'Omit<React.ComponentProps<"input">, "type">', description: "Any native radio attribute." },
        ],
        client: false,
        usage: `import { RadioButton } from "@/components/ui/radio-button";

<RadioButton name="plan" value="free" label="Free, for side projects" defaultChecked />
<RadioButton name="plan" value="pro" label="Pro, for teams" />
<RadioButton name="plan" value="custom" label="Custom (disabled)" disabled />`,
      },
      {
        name: "Select",
        file: "select.tsx",
        importPath: "@/components/ui/select",
        exports: [
          "Select",
          "SelectItem",
          "SelectRoot",
          "SelectGroup",
          "SelectValue",
          "SelectTrigger",
          "SelectScrollUpButton",
          "SelectScrollDownButton",
          "SelectContent",
          "SelectLabel",
          "SelectSeparator",
        ],
        description:
          'An all-in-one controlled `Select` that adds an implicit "any" option (empty string), plus composable parts (`SelectRoot`, `SelectTrigger`, `SelectContent` and so on) for grouped options, custom triggers or uncontrolled use inside a form.',
        props: [
          { name: "value", type: "string", description: 'Select: the selected value; "" means the placeholder ("any") option.' },
          { name: "onValueChange", type: "(value: string) => void", description: 'Select: called with the new value ("" for any).' },
          { name: "placeholder", type: "string", description: 'Select: label of the empty option. Defaults to "Any".' },
          { name: "children", type: "React.ReactNode", description: "Select: SelectItem elements." },
          { name: "value (item)", type: "string", description: "SelectItem: the option value." },
        ],
        client: true,
        dependsOn: ["@radix-ui/react-select", "@iconify/react"],
        usage: `import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectRoot,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

<Select value={status} onValueChange={setStatus} placeholder="Any status">
  <SelectItem value="open">Open</SelectItem>
  <SelectItem value="closed">Closed</SelectItem>
</Select>

<SelectRoot value={fruit} onValueChange={setFruit}>
  <SelectTrigger>
    <SelectValue placeholder="Pick a fruit" />
  </SelectTrigger>
  <SelectContent>
    <SelectGroup>
      <SelectLabel>Fruit</SelectLabel>
      <SelectItem value="apple">Apple</SelectItem>
      <SelectItem value="pear">Pear</SelectItem>
    </SelectGroup>
  </SelectContent>
</SelectRoot>`,
      },
      {
        name: "Slider",
        file: "slider.tsx",
        importPath: "@/components/ui/slider",
        exports: ["Slider"],
        description: "A controlled single-thumb slider that takes and emits a plain number.",
        props: [
          { name: "value", type: "number", description: "Current value." },
          { name: "onChange", type: "(value: number) => void", description: "Called with the new value." },
          { name: "min", type: "number", description: "Minimum. Defaults to 0." },
          { name: "max", type: "number", description: "Maximum. Defaults to 100." },
          { name: "step", type: "number", description: "Step size. Defaults to 1." },
        ],
        client: true,
        dependsOn: ["@radix-ui/react-slider"],
        usage: `import { Slider } from "@/components/ui/slider";

<Slider value={volume} onChange={setVolume} aria-label="Volume" />`,
      },
      {
        name: "Slider range",
        file: "slider-range.tsx",
        importPath: "@/components/ui/slider-range",
        exports: ["SliderRange"],
        description: "A controlled two-thumb slider for picking a [min, max] range.",
        props: [
          { name: "value", type: "[number, number]", description: "Current range." },
          { name: "onChange", type: "(value: [number, number]) => void", description: "Called with the new range." },
          { name: "min", type: "number", description: "Minimum. Defaults to 0." },
          { name: "max", type: "number", description: "Maximum. Defaults to 100." },
          { name: "step", type: "number", description: "Step size. Defaults to 1." },
        ],
        client: true,
        dependsOn: ["@radix-ui/react-slider"],
        usage: `import { SliderRange } from "@/components/ui/slider-range";

const [range, setRange] = React.useState<[number, number]>([20, 80]);

<SliderRange value={range} onChange={setRange} aria-label="Price range" />`,
      },
      {
        name: "Tag input",
        file: "tag-input.tsx",
        importPath: "@/components/ui/tag-input",
        exports: ["TagInput"],
        description:
          "Free-form multi-value entry: type a value and press Enter (or blur) to add it as a removable badge. Use `validate` to restrict what counts as a tag.",
        props: [
          { name: "value", type: "string[]", description: "Current tags." },
          { name: "onChange", type: "(next: string[]) => void", description: "Called with the updated tag list." },
          { name: "placeholder", type: "string", description: "Shown while there are no tags." },
          { name: "validate", type: "(candidate: string) => boolean", description: "Rejects invalid drafts (they simply do not commit)." },
          { name: "normalize", type: "(raw: string) => string", description: "Runs before validation and dedupe. Defaults to trimming." },
        ],
        client: true,
        usage: `import { TagInput } from "@/components/ui/tag-input";

const [tags, setTags] = React.useState<string[]>(["design", "frontend"]);

<TagInput value={tags} onChange={setTags} placeholder="Add a tag and press Enter" />`,
      },
      {
        name: "Tag select",
        file: "tag-select.tsx",
        importPath: "@/components/ui/tag-select",
        exports: ["TagSelect", "TagSelectOption"],
        description:
          "Multi-select from a fixed set of options: an always-visible search box and list, with the chosen values shown as removable badges. Use it instead of TagInput when users pick from known values rather than typing new ones.",
        props: [
          {
            name: "options",
            type: "{ value: string; label: string; icon?: string }[]",
            description: "Selectable options, each with an optional Iconify icon.",
          },
          { name: "value", type: "string[]", description: "Selected option values." },
          { name: "onChange", type: "(next: string[]) => void", description: "Called with the updated selection." },
          { name: "placeholder", type: "string", description: 'Search box placeholder. Defaults to "Search…".' },
        ],
        client: true,
        dependsOn: ["cmdk", "@iconify/react"],
        usage: `import { TagSelect, type TagSelectOption } from "@/components/ui/tag-select";

const OPTIONS: TagSelectOption[] = [
  { value: "design", label: "Design", icon: "lucide:palette" },
  { value: "engineering", label: "Engineering", icon: "lucide:code" },
  { value: "support", label: "Support", icon: "lucide:life-buoy" },
];

<TagSelect options={OPTIONS} value={picked} onChange={setPicked} />`,
      },
      {
        name: "Phone input",
        file: "phone-input.tsx",
        importPath: "@/components/ui/phone-input",
        exports: ["PhoneInput"],
        description:
          'A phone number field with a searchable country-code picker that emits a single "+<dial><national>" string. Typing or pasting a full international number switches the country automatically.',
        props: [
          { name: "value", type: "string", description: 'E.164-like value, e.g. "+14155552671".' },
          { name: "onValueChange", type: "(next: string) => void", description: "Called with the combined value." },
          { name: "defaultCountryIso2", type: "string", description: "Country preselected while the value is empty (ISO 3166-1 alpha-2)." },
          { name: "countries", type: "PhoneCountry[]", description: "Restrict or reorder the country list." },
          { name: "wrapperClassName", type: "string", description: "Classes for the outer wrapper; className goes to the input." },
        ],
        client: true,
        dependsOn: ["country-flag-icons", "cmdk", "@radix-ui/react-popover", "@iconify/react"],
        usage: `import { PhoneInput } from "@/components/ui/phone-input";

<PhoneInput value={phone} onValueChange={setPhone} defaultCountryIso2="US" />`,
      },
      {
        name: "Slide selector",
        file: "slide-selector.tsx",
        importPath: "@/components/ui/slide-selector",
        exports: ["SlideSelector", "SlideSelectorItem", "SlideSelectorProps"],
        description:
          "A scrollable strip of single-select buttons, horizontal or vertical. It is the building block for the hour, minute and year columns in the date-time pickers.",
        props: [
          { name: "items", type: "{ value: string; label: React.ReactNode }[]", description: "Options to show." },
          { name: "selectedValue", type: "string", description: "The selected option value." },
          { name: "onSelect", type: "(value: string) => void", description: "Called with the clicked option value." },
          { name: "orientation", type: '"horizontal" | "vertical"', description: 'Strip direction. Defaults to "vertical".' },
          { name: "variant", type: '"pill" | "square"', description: 'Square tiles or rounded pills. Defaults to "square".' },
          { name: "aria-label", type: "string", description: "Accessible name for the option list." },
        ],
        client: true,
        dependsOn: ["@radix-ui/react-scroll-area"],
        usage: `import { SlideSelector } from "@/components/ui/slide-selector";

<SlideSelector
  aria-label="Size"
  orientation="horizontal"
  variant="pill"
  items={[
    { value: "s", label: "Small" },
    { value: "m", label: "Medium" },
    { value: "l", label: "Large" },
  ]}
  selectedValue={size}
  onSelect={setSize}
/>`,
      },
      {
        name: "Calendar",
        file: "calendar.tsx",
        importPath: "@/components/ui/calendar",
        exports: ["Calendar", "CalendarProps"],
        description:
          "A themed month calendar built on react-day-picker, used inside the date pickers. It accepts every DayPicker prop, including single, multiple and range modes.",
        props: [
          { name: "mode", type: '"single" | "multiple" | "range"', description: "Selection mode (DayPicker prop)." },
          { name: "selected", type: "Date | Date[] | DateRange | undefined", description: "Selected value for the chosen mode." },
          { name: "onSelect", type: "(value) => void", description: "Called when the selection changes." },
          { name: "defaultMonth", type: "Date", description: "Month shown initially." },
          { name: "classNames", type: "Partial<ClassNames>", description: "Override individual part classes." },
        ],
        client: true,
        dependsOn: ["react-day-picker", "@iconify/react"],
        usage: `import { Calendar } from "@/components/ui/calendar";

const [day, setDay] = React.useState<Date | undefined>(new Date());

<Calendar mode="single" selected={day} onSelect={setDay} />`,
      },
      {
        name: "Date picker",
        file: "date-picker.tsx",
        importPath: "@/components/ui/date-picker",
        exports: ["DatePicker"],
        description:
          "A button that opens a calendar popover and closes itself once a date is picked. Use it for a single date with no time.",
        props: [
          { name: "value", type: "Date | undefined", description: "Selected date." },
          { name: "onChange", type: "(date: Date | undefined) => void", description: "Called with the picked date." },
          { name: "placeholder", type: "string", description: 'Trigger text when empty. Defaults to "Pick a date".' },
          { name: "className", type: "string", description: "Classes for the trigger button." },
        ],
        client: true,
        dependsOn: ["date-fns", "react-day-picker", "@radix-ui/react-popover"],
        usage: `import { DatePicker } from "@/components/ui/date-picker";

const [date, setDate] = React.useState<Date | undefined>(undefined);

<DatePicker value={date} onChange={setDate} />`,
      },
      {
        name: "Date-time picker",
        file: "date-time-picker.tsx",
        importPath: "@/components/ui/date-time-picker",
        exports: ["DateTimePicker"],
        description:
          "Date plus 12-hour time in one popover: a calendar beside hour, minute and AM/PM columns. It stays open while adjusting and works controlled or uncontrolled.",
        props: [
          { name: "value", type: "Date", description: "Controlled value. Leave undefined and use defaultValue for uncontrolled." },
          { name: "defaultValue", type: "Date", description: "Initial value when uncontrolled." },
          { name: "onChange", type: "(next: Date | undefined) => void", description: "Called on every date or time change." },
          { name: "placeholder", type: "string", description: 'Trigger text when empty. Defaults to "MM/DD/YYYY hh:mm aa".' },
          { name: "disabled", type: "boolean", description: "Disables the trigger." },
        ],
        client: true,
        dependsOn: ["date-fns", "react-day-picker", "@radix-ui/react-popover"],
        usage: `import { DateTimePicker } from "@/components/ui/date-time-picker";

<DateTimePicker defaultValue={new Date()} onChange={(next) => console.log(next)} />`,
      },
      {
        name: "Date-time-year picker",
        file: "date-time-year.tsx",
        importPath: "@/components/ui/date-time-year",
        exports: ["DateTimeYear"],
        description:
          "An inline date-time picker for dates far from today: a horizontal year strip above a calendar with 24-hour hour and minute columns. Choosing a year jumps the calendar to it.",
        props: [
          { name: "value", type: "Date", description: "Controlled value. Leave undefined and use defaultValue for uncontrolled." },
          { name: "defaultValue", type: "Date", description: "Initial value when uncontrolled." },
          { name: "onChange", type: "(next: Date | undefined) => void", description: "Called on every change." },
          { name: "startYear", type: "number", description: "First selectable year. Defaults to 100 years ago." },
          { name: "endYear", type: "number", description: "Last selectable year. Defaults to 20 years from now." },
        ],
        client: true,
        dependsOn: ["date-fns", "react-day-picker"],
        usage: `import { DateTimeYear } from "@/components/ui/date-time-year";

<DateTimeYear defaultValue={new Date(1990, 5, 1, 9, 30)} startYear={1900} />`,
      },
      {
        name: "Year picker",
        file: "year-picker.tsx",
        importPath: "@/components/ui/year-picker",
        exports: ["YearPicker"],
        description:
          'A Select listing years from newest to oldest, with an "any year" empty option. Use it when only the year matters.',
        props: [
          { name: "value", type: "number | undefined", description: "Selected year." },
          { name: "onChange", type: "(year: number | undefined) => void", description: "Called with the year, or undefined for any." },
          { name: "minYear", type: "number", description: "Oldest year listed. Defaults to 1900." },
          { name: "maxYear", type: "number", description: "Newest year listed. Defaults to the current year." },
          { name: "placeholder", type: "string", description: 'Label of the empty option. Defaults to "Any year".' },
        ],
        client: true,
        dependsOn: ["@radix-ui/react-select"],
        usage: `import { YearPicker } from "@/components/ui/year-picker";

const [year, setYear] = React.useState<number | undefined>(undefined);

<YearPicker value={year} onChange={setYear} />`,
      },
      {
        name: "Form gallery",
        file: "form-gallery.tsx",
        importPath: "@/components/ui/form-gallery",
        exports: ["FormGallery", "FormGalleryApi", "FormGallerySlide"],
        description:
          "A multi-step form carousel with a dot pager, sliding steps and a shared Next/Finish button. Off-screen steps are inert so their fields cannot be tabbed into.",
        props: [
          {
            name: "slides",
            type: "{ title?: string; content: React.ReactNode | ((api: FormGalleryApi) => React.ReactNode); hasInternalNext?: boolean }[]",
            description: "Steps; a render-function content receives next/goTo controls.",
          },
          { name: "onFinish", type: "() => void | Promise<void>", description: "Called when Next is pressed on the last step." },
          { name: "index", type: "number", description: "Controlled step index. Leave undefined for uncontrolled." },
          { name: "onIndexChange", type: "(index: number) => void", description: "Called when the step changes." },
          { name: "nextLabel", type: "string", description: 'Next button text. Defaults to "Next".' },
          { name: "finishLabel", type: "string", description: 'Last-step button text. Defaults to "Get started".' },
        ],
        client: true,
        usage: `import { FormGallery } from "@/components/ui/form-gallery";
import { Input } from "@/components/ui/input";
import { InputField } from "@/components/ui/input-field";

<div className="h-56">
  <FormGallery
    slides={[
      { title: "Name", content: <Input placeholder="Your name" /> },
      { title: "Email", content: <InputField leftIcon="mdi:email-outline" placeholder="you@example.com" /> },
      { title: "Done", content: <p className="text-sm text-muted-foreground">All set, press finish.</p> },
    ]}
    onFinish={() => console.log("finished")}
  />
</div>`,
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  /* Overlays                                                            */
  /* ------------------------------------------------------------------ */
  {
    id: "overlays",
    title: "Overlays",
    description: "Dialogs, menus, popovers, tooltips and toasts that float above the page.",
    entries: [
      {
        name: "Dialog",
        file: "dialog.tsx",
        importPath: "@/components/ui/dialog",
        exports: [
          "Dialog",
          "DialogTrigger",
          "DialogClose",
          "DialogPortal",
          "DialogOverlay",
          "DialogContent",
          "DialogTitle",
          "DialogDescription",
          "DialogHeader",
          "DialogFooter",
        ],
        description:
          "A modal dialog that fills the viewport with a small inset and scrolls with a custom scrollbar when content overflows. A floating close badge appears on hover; `DialogClose` can wrap any element to close it.",
        props: [
          { name: "open", type: "boolean", description: "Dialog: controlled open state." },
          { name: "onOpenChange", type: "(open: boolean) => void", description: "Dialog: called when it opens or closes." },
          { name: "hideClose", type: "boolean", description: "DialogContent: drop the default close badge entirely." },
          {
            name: "closeClassName",
            type: "string",
            description: 'DialogContent: classes for the default close badge, e.g. "hidden md:flex".',
          },
          { name: "asChild", type: "boolean", description: "DialogTrigger / DialogClose: render onto your own element." },
        ],
        client: true,
        dependsOn: ["@radix-ui/react-dialog", "simplebar-react", "@iconify/react"],
        usage: `import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

<Dialog>
  <DialogTrigger asChild>
    <Button variant="secondary">Open dialog</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Dialog title</DialogTitle>
      <DialogDescription>A short explanation of what this dialog is for.</DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <DialogClose asChild>
        <Button variant="secondary">Cancel</Button>
      </DialogClose>
      <DialogClose asChild>
        <Button>Confirm</Button>
      </DialogClose>
    </DialogFooter>
  </DialogContent>
</Dialog>`,
      },
      {
        name: "Tooltip",
        file: "tooltip.tsx",
        importPath: "@/components/ui/tooltip",
        exports: ["TooltipProvider", "Tooltip", "TooltipTrigger", "TooltipContent"],
        description:
          "A small label shown on hover or focus of its trigger. Wrap the app or a subtree in TooltipProvider once so tooltips share open and close delays.",
        props: [
          { name: "delayDuration", type: "number", description: "TooltipProvider: ms before a tooltip opens." },
          { name: "side", type: '"top" | "right" | "bottom" | "left"', description: "TooltipContent: preferred side." },
          { name: "sideOffset", type: "number", description: "TooltipContent: gap from the trigger. Defaults to 8." },
          { name: "asChild", type: "boolean", description: "TooltipTrigger: render onto your own element." },
        ],
        client: true,
        dependsOn: ["@radix-ui/react-tooltip"],
        usage: `import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

<TooltipProvider delayDuration={200}>
  <Tooltip>
    <TooltipTrigger asChild>
      <Button variant="outline">Hover me</Button>
    </TooltipTrigger>
    <TooltipContent side="top">Helpful hint</TooltipContent>
  </Tooltip>
</TooltipProvider>`,
      },
      {
        name: "Popover",
        file: "popover.tsx",
        importPath: "@/components/ui/popover",
        exports: ["Popover", "PopoverTrigger", "PopoverAnchor", "PopoverContent"],
        description:
          "A floating panel anchored to a trigger, for small forms or extra options that should not take over the page.",
        props: [
          { name: "open", type: "boolean", description: "Popover: controlled open state." },
          { name: "onOpenChange", type: "(open: boolean) => void", description: "Popover: called when it opens or closes." },
          { name: "align", type: '"start" | "center" | "end"', description: 'PopoverContent: alignment. Defaults to "start".' },
          { name: "sideOffset", type: "number", description: "PopoverContent: gap from the trigger. Defaults to 4." },
        ],
        client: true,
        dependsOn: ["@radix-ui/react-popover"],
        usage: `import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

<Popover>
  <PopoverTrigger asChild>
    <Button variant="secondary">Open popover</Button>
  </PopoverTrigger>
  <PopoverContent className="w-64 space-y-2">
    <p className="font-medium">Dimensions</p>
    <Input placeholder="Width" />
    <Input placeholder="Height" />
  </PopoverContent>
</Popover>`,
      },
      {
        name: "Hover card",
        file: "hover-card.tsx",
        importPath: "@/components/ui/hover-card",
        exports: ["HoverCard", "HoverCardTrigger", "HoverCardContent", "HoverCardLink"],
        description:
          "A floating preview card shown while hovering or focusing a trigger, for previews of links, people or references. HoverCardLink is a small external-link pill for use inside it.",
        props: [
          { name: "openDelay", type: "number", description: "HoverCard: ms before opening." },
          { name: "closeDelay", type: "number", description: "HoverCard: ms before closing." },
          { name: "align", type: '"start" | "center" | "end"', description: 'HoverCardContent: alignment. Defaults to "center".' },
          { name: "href", type: "string", description: "HoverCardLink: target URL (opens in a new tab)." },
          { name: "icon", type: "string", description: 'HoverCardLink: trailing icon. Defaults to "mdi:open-in-new".' },
        ],
        client: true,
        dependsOn: ["@radix-ui/react-hover-card", "@iconify/react"],
        usage: `import { HoverCard, HoverCardContent, HoverCardLink, HoverCardTrigger } from "@/components/ui/hover-card";

<HoverCard>
  <HoverCardTrigger asChild>
    <a href="#profile" className="text-primary hover:underline">@username</a>
  </HoverCardTrigger>
  <HoverCardContent className="space-y-2">
    <p className="font-medium">Display name</p>
    <p className="text-xs text-muted-foreground">A short bio goes here.</p>
    <HoverCardLink href="https://example.com">example.com</HoverCardLink>
  </HoverCardContent>
</HoverCard>`,
      },
      {
        name: "Reference chip",
        file: "reference-chip.tsx",
        importPath: "@/components/ui/reference-chip",
        exports: ["ReferenceChip", "ReferenceRecord", "ReferenceMap"],
        description:
          'An inline citation chip ("Author 2021") that reveals the full reference in a hover card. Pass the whole reference map and the id to show; unknown ids render nothing.',
        props: [
          { name: "refs", type: "ReferenceMap", description: "Map of id to { id, authors, year?, title, source?, note?, href?, tag? }." },
          { name: "id", type: "keyof refs", description: "Which reference to show." },
          { name: "side", type: '"top" | "right" | "bottom" | "left"', description: 'Card side. Defaults to "top".' },
          { name: "align", type: '"start" | "center" | "end"', description: 'Card alignment. Defaults to "start".' },
          { name: "linkLabel", type: "string", description: 'Text of the source link. Defaults to "View source".' },
        ],
        client: true,
        dependsOn: ["@radix-ui/react-hover-card"],
        usage: `import { ReferenceChip, type ReferenceMap } from "@/components/ui/reference-chip";

const REFS = {
  doe21: {
    id: "doe21",
    authors: "Doe, J.",
    year: "2021",
    title: "An Example Paper Title",
    source: "Journal of Examples",
    href: "https://example.com/paper",
  },
} satisfies ReferenceMap;

<p>
  A cited claim <ReferenceChip refs={REFS} id="doe21" />.
</p>`,
      },
      {
        name: "Dropdown menu",
        file: "dropdown-menu.tsx",
        importPath: "@/components/ui/dropdown-menu",
        exports: [
          "DropdownMenu",
          "DropdownMenuTrigger",
          "DropdownMenuGroup",
          "DropdownMenuPortal",
          "DropdownMenuSub",
          "DropdownMenuRadioGroup",
          "DropdownMenuContent",
          "DropdownMenuItem",
          "DropdownMenuCheckboxItem",
          "DropdownMenuLabel",
          "DropdownMenuSeparator",
          "DropdownMenuSubTrigger",
          "DropdownMenuSubContent",
          "DropdownMenuRadioItem",
          "DropdownMenuShortcut",
        ],
        description:
          "A fully keyboard-accessible menu opened from a trigger, with labels, checkbox and radio items, shortcuts and nested submenus.",
        props: [
          { name: "sideOffset", type: "number", description: "DropdownMenuContent: gap from the trigger. Defaults to 4." },
          { name: "checked", type: "boolean", description: "DropdownMenuCheckboxItem: checked state." },
          { name: "onCheckedChange", type: "(checked: boolean) => void", description: "DropdownMenuCheckboxItem: called on toggle." },
          { name: "value", type: "string", description: "DropdownMenuRadioGroup: selected value." },
          { name: "onValueChange", type: "(value: string) => void", description: "DropdownMenuRadioGroup: called with the new value." },
          { name: "inset", type: "boolean", description: "DropdownMenuSubTrigger: indent to align with indicator items." },
        ],
        client: true,
        dependsOn: ["@radix-ui/react-dropdown-menu", "@iconify/react"],
        usage: `import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="secondary">Options</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent className="w-56">
    <DropdownMenuLabel>My account</DropdownMenuLabel>
    <DropdownMenuItem>
      Profile <DropdownMenuShortcut>⌘P</DropdownMenuShortcut>
    </DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuCheckboxItem checked={showGrid} onCheckedChange={(v) => setShowGrid(v === true)}>
      Show grid
    </DropdownMenuCheckboxItem>
    <DropdownMenuRadioGroup value={sort} onValueChange={setSort}>
      <DropdownMenuRadioItem value="newest">Newest</DropdownMenuRadioItem>
      <DropdownMenuRadioItem value="oldest">Oldest</DropdownMenuRadioItem>
    </DropdownMenuRadioGroup>
    <DropdownMenuSub>
      <DropdownMenuSubTrigger>More</DropdownMenuSubTrigger>
      <DropdownMenuSubContent>
        <DropdownMenuItem>Duplicate</DropdownMenuItem>
      </DropdownMenuSubContent>
    </DropdownMenuSub>
  </DropdownMenuContent>
</DropdownMenu>`,
      },
      {
        name: "Context menu",
        file: "context-menu.tsx",
        importPath: "@/components/ui/context-menu",
        exports: [
          "ContextMenu",
          "ContextMenuTrigger",
          "ContextMenuGroup",
          "ContextMenuPortal",
          "ContextMenuSub",
          "ContextMenuRadioGroup",
          "ContextMenuContent",
          "ContextMenuSubContent",
          "ContextMenuSubTrigger",
          "ContextMenuItem",
          "ContextMenuCheckboxItem",
          "ContextMenuRadioItem",
          "ContextMenuLabel",
          "ContextMenuSeparator",
          "ContextMenuShortcut",
        ],
        description:
          "A right-click (or long-press) menu for an area of the page, with the same item types as the dropdown menu plus a destructive item variant.",
        props: [
          {
            name: "variant",
            type: '"default" | "destructive"',
            description: "ContextMenuItem: tint for irreversible actions.",
          },
          { name: "inset", type: "boolean", description: "Item, label and sub-trigger: indent to align with indicator items." },
          { name: "checked", type: "boolean", description: "ContextMenuCheckboxItem: checked state." },
          { name: "onCheckedChange", type: "(checked: boolean) => void", description: "ContextMenuCheckboxItem: called on toggle." },
        ],
        client: true,
        dependsOn: ["@radix-ui/react-context-menu", "@iconify/react"],
        usage: `import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";

<ContextMenu>
  <ContextMenuTrigger className="flex h-28 items-center justify-center rounded-md border border-dashed border-border text-sm">
    Right-click here
  </ContextMenuTrigger>
  <ContextMenuContent>
    <ContextMenuLabel>Actions</ContextMenuLabel>
    <ContextMenuItem>
      Back <ContextMenuShortcut>⌘[</ContextMenuShortcut>
    </ContextMenuItem>
    <ContextMenuItem>Reload</ContextMenuItem>
    <ContextMenuSeparator />
    <ContextMenuItem variant="destructive">Delete</ContextMenuItem>
  </ContextMenuContent>
</ContextMenu>`,
      },
      {
        name: "Command",
        file: "command.tsx",
        importPath: "@/components/ui/command",
        exports: [
          "Command",
          "CommandDialog",
          "CommandInput",
          "CommandList",
          "CommandEmpty",
          "CommandGroup",
          "CommandItem",
          "CommandShortcut",
          "CommandSeparator",
        ],
        description:
          "A searchable, keyboard-driven command list, usable inline or as a command palette inside CommandDialog. The list scrolls with a custom scrollbar.",
        props: [
          { name: "open", type: "boolean", description: "CommandDialog: controlled open state." },
          { name: "onOpenChange", type: "(open: boolean) => void", description: "CommandDialog: called when it opens or closes." },
          {
            name: "scrollClassName",
            type: "string",
            description: 'CommandList: override the default 300px height cap, e.g. "max-h-40".',
          },
          { name: "heading", type: "React.ReactNode", description: "CommandGroup: group heading." },
          { name: "onSelect", type: "(value: string) => void", description: "CommandItem: called when the item is chosen." },
        ],
        client: true,
        dependsOn: ["cmdk", "simplebar-react", "@radix-ui/react-dialog", "@iconify/react"],
        usage: `import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandShortcut,
} from "@/components/ui/command";

<Command className="rounded-md">
  <CommandInput placeholder="Type a command…" />
  <CommandList scrollClassName="max-h-40">
    <CommandEmpty>No results.</CommandEmpty>
    <CommandGroup heading="Suggestions">
      <CommandItem>Calendar</CommandItem>
      <CommandItem>
        Profile <CommandShortcut>⌘P</CommandShortcut>
      </CommandItem>
    </CommandGroup>
  </CommandList>
</Command>

<CommandDialog open={open} onOpenChange={setOpen}>
  <CommandInput placeholder="Search…" />
  <CommandList>
    <CommandEmpty>No results.</CommandEmpty>
    <CommandGroup heading="Pages">
      <CommandItem onSelect={() => setOpen(false)}>Dashboard</CommandItem>
    </CommandGroup>
  </CommandList>
</CommandDialog>`,
      },
      {
        name: "Popup message",
        file: "popup-message.tsx",
        importPath: "@/components/ui/popup-message",
        exports: ["PopupMessageProvider", "usePopupMessage", "PopupPosition", "PopupMessageOptions"],
        description:
          "A lightweight toast system: mount PopupMessageProvider once near the root, then call usePopupMessage().showPopup() from any client component. Popups fade out after a duration and stack per screen position.",
        props: [
          {
            name: "showPopup(messageOrContent, options?)",
            type: "(messageOrContent: React.ReactNode, options?: PopupMessageOptions) => number",
            description: "Shows a popup and returns its id. A string renders as body text.",
          },
          { name: "options.title", type: "string", description: "Bold title above the message." },
          {
            name: "options.position",
            type: '"top-center" | "top-left" | "top-right" | "bottom-center" | "bottom-left" | "bottom-right"',
            description: 'Screen position. Defaults to "top-center".',
          },
          { name: "options.durationMs", type: "number", description: "How long it stays visible. Defaults to 3200." },
          { name: "options.content", type: "React.ReactNode", description: "Rich content that overrides the message body." },
        ],
        client: true,
        usage: `import { Button } from "@/components/ui/button";
import { PopupMessageProvider, usePopupMessage } from "@/components/ui/popup-message";

// Once, near the root:
<PopupMessageProvider>{children}</PopupMessageProvider>

// In any client component below it:
function SaveButton() {
  const { showPopup } = usePopupMessage();
  return (
    <Button onClick={() => showPopup("Your changes were saved.", { title: "Saved", position: "bottom-right" })}>
      Save
    </Button>
  );
}`,
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  /* Data display                                                        */
  /* ------------------------------------------------------------------ */
  {
    id: "data-display",
    title: "Data display",
    description: "Surfaces, tables, lists, status indicators and embeds for showing information.",
    entries: [
      {
        name: "Badge",
        file: "badge.tsx",
        importPath: "@/components/ui/badge",
        exports: ["Badge"],
        description:
          "A small grey pill for tags and labels. Pass onRemove to add a remove button, which is how tag inputs use it.",
        props: [
          { name: "children", type: "React.ReactNode", description: "Badge content." },
          { name: "onRemove", type: "() => void", description: "When set, renders a remove (trash) button." },
          { name: "removeLabel", type: "string", description: 'Accessible label for the remove button. Defaults to "Remove".' },
          { name: "className", type: "string", description: "Extra classes." },
        ],
        client: true,
        dependsOn: ["@iconify/react"],
        usage: `import { Badge } from "@/components/ui/badge";

<Badge>Static</Badge>
<Badge onRemove={() => removeTag("beta")} removeLabel="Remove beta">
  beta
</Badge>`,
      },
      {
        name: "Card",
        file: "card.tsx",
        importPath: "@/components/ui/card",
        exports: ["Card", "CardProps", "CardHeader", "CardTitle", "CardDescription", "CardContent", "CardFooter"],
        description:
          "A bordered surface for grouping related content. Compose it from header, title, description, content and footer parts, each with its own padding.",
        props: [
          { name: "...props", type: 'React.ComponentProps<"div">', description: "Card, CardHeader, CardContent, CardFooter: any div attribute." },
          { name: "...props (title)", type: 'React.ComponentProps<"h3">', description: "CardTitle renders an h3." },
          { name: "...props (description)", type: 'React.ComponentProps<"p">', description: "CardDescription renders a p." },
        ],
        client: false,
        usage: `import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

<Card>
  <CardHeader>
    <CardTitle>Card title</CardTitle>
    <CardDescription>Card description</CardDescription>
  </CardHeader>
  <CardContent>Body content goes here.</CardContent>
  <CardFooter>
    <Button variant="secondary">Action</Button>
  </CardFooter>
</Card>`,
      },
      {
        name: "Table",
        file: "table.tsx",
        importPath: "@/components/ui/table",
        exports: ["Table", "TableHeader", "TableBody", "TableFooter", "TableRow", "TableHead", "TableCell", "TableCaption"],
        description:
          "Plain styled wrappers for semantic table elements, with horizontal overflow scrolling. Use DataTable when you need sorting or selection.",
        props: [
          { name: "...props", type: "React.ComponentProps<element>", description: "Each part accepts the attributes of the element it renders." },
        ],
        client: false,
        usage: `import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

<Table>
  <TableCaption>Team members</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead>Name</TableHead>
      <TableHead>Role</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {people.map((p) => (
      <TableRow key={p.name}>
        <TableCell>{p.name}</TableCell>
        <TableCell>{p.role}</TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>`,
      },
      {
        name: "Data table",
        file: "data-table.tsx",
        importPath: "@/components/ui/data-table",
        exports: [
          "DataTable",
          "createDataTableColumnHelper",
          "dataTableFeatures",
          "DataTableFeatures",
          "DataTableColumnDef",
        ],
        description:
          "A sortable table built on TanStack Table and the Table primitives: click a header to cycle ascending, descending and unsorted. Pass `selectable` for spreadsheet-style range selection that copies as tab-separated values.",
        props: [
          {
            name: "columns",
            type: "DataTableColumnDef<TData>[]",
            description: "Column definitions; keep stable (module scope or useMemo).",
          },
          { name: "data", type: "TData[]", description: "Row data; keep stable for the same reason." },
          { name: "selectable", type: "boolean", description: "Enable click / shift-click cell selection and Ctrl/Cmd+C copy." },
          { name: "showCopyButton", type: "boolean", description: 'With selectable, show a "Copy selection" button. Defaults to true.' },
          { name: "emptyMessage", type: "React.ReactNode", description: 'Shown when there are no rows. Defaults to "No results.".' },
        ],
        client: true,
        dependsOn: ["@tanstack/react-table", "@iconify/react"],
        usage: `import { createDataTableColumnHelper, DataTable } from "@/components/ui/data-table";

type Person = { name: string; role: string; score: number };

const col = createDataTableColumnHelper<Person>();
const COLUMNS = [
  col.accessor("name", { header: "Name" }),
  col.accessor("role", { header: "Role" }),
  col.accessor("score", { header: "Score" }),
];

<DataTable columns={COLUMNS} data={people} selectable />`,
      },
      {
        name: "Progress bar",
        file: "progress-bar.tsx",
        importPath: "@/components/ui/progress-bar",
        exports: ["ProgressBar"],
        description:
          "A tall labelled bar with the label, value, percentage and an optional change indicator overlaid on the fill. The value is clamped to the range 0 to max.",
        props: [
          { name: "value", type: "number", description: "Current value." },
          { name: "max", type: "number", description: "Maximum value." },
          { name: "label", type: "string", description: "Label shown before the value; also the default accessible name." },
          {
            name: "delta",
            type: "string",
            description: 'Change indicator like "+12%" (success color) or "-3" (destructive color).',
          },
          { name: "showHandle", type: "boolean", description: "Draw a vertical marker at the fill position." },
          { name: "children", type: "React.ReactNode", description: "Replaces the default text overlay." },
        ],
        client: false,
        usage: `import { ProgressBar } from "@/components/ui/progress-bar";

<ProgressBar label="Storage" value={64} max={100} delta="+12%" />
<ProgressBar label="Quota" value={30} max={120} delta="-3" showHandle />`,
      },
      {
        name: "Hierarchy",
        file: "hierarchy.tsx",
        importPath: "@/components/ui/hierarchy",
        exports: ["Hierarchy", "TreeNode", "HierarchyProps"],
        description:
          "A recursive tree view where branches expand and collapse and leaves line up with their siblings. Use it for file trees, nested categories or org charts.",
        props: [
          {
            name: "nodes",
            type: "TreeNode[]",
            description: "Tree data: { id, label, children?, icon?, actions?, defaultExpanded?, expanded?, disabled?, selected? }.",
          },
          { name: "selectedId", type: "string", description: "Highlight a single node." },
          { name: "selectedIds", type: "string[]", description: "Highlight several nodes." },
          { name: "onToggle", type: "(node: TreeNode, expanded: boolean) => void", description: "Called when a branch opens or closes." },
          { name: "renderLabel", type: "(node: TreeNode, depth: number) => React.ReactNode", description: "Custom label renderer." },
        ],
        client: true,
        usage: `import { Hierarchy, type TreeNode } from "@/components/ui/hierarchy";

const TREE: TreeNode[] = [
  {
    id: "src",
    label: "src",
    defaultExpanded: true,
    children: [
      { id: "app", label: "app", children: [{ id: "page", label: "page.tsx" }] },
      { id: "utils", label: "utils.ts" },
    ],
  },
  { id: "readme", label: "README.md" },
];

<Hierarchy nodes={TREE} selectedId="utils" />`,
      },
      {
        name: "Icon list item",
        file: "icon-list-item.tsx",
        importPath: "@/components/ui/icon-list-item",
        exports: ["IconListItem", "IconListItemProps"],
        description:
          "A list item with a leading icon, for feature lists, checklists or contact details. Use it inside a ul.",
        props: [
          { name: "icon", type: "string", description: 'Iconify icon name, e.g. "lucide:check".' },
          { name: "iconClassName", type: "string", description: "Extra classes for the icon (defaults to the primary color)." },
          { name: "...props", type: 'React.ComponentProps<"li">', description: "Any li attribute." },
        ],
        client: false,
        dependsOn: ["@iconify/react"],
        usage: `import { IconListItem } from "@/components/ui/icon-list-item";

<ul className="space-y-2 text-sm">
  <IconListItem icon="lucide:check">Server-rendered by default</IconListItem>
  <IconListItem icon="lucide:check">Accessible primitives</IconListItem>
  <IconListItem icon="lucide:x" iconClassName="text-destructive">
    Not included
  </IconListItem>
</ul>`,
      },
      {
        name: "Logo link card",
        file: "logo-link-card.tsx",
        importPath: "@/components/ui/logo-link-card",
        exports: ["LogoLinkCard", "LogoLinkCardProps"],
        description:
          "A link card with a round logo badge overlapping its top edge, plus a title, subtitle and description. The whole card is the link, for partner, project or profile lists.",
        props: [
          { name: "href", type: "string", description: "Link target." },
          { name: "title", type: "string", description: "Card title." },
          { name: "subtitle", type: "React.ReactNode", description: "Optional line under the title." },
          { name: "description", type: "React.ReactNode", description: "Optional body text." },
          { name: "logo / logoSrc", type: "React.ReactNode / string", description: "A node (e.g. an icon) or an image URL for the badge." },
          { name: "external", type: "boolean", description: "Open in a new tab. Defaults to true for absolute http(s) URLs." },
        ],
        client: false,
        dependsOn: ["next"],
        usage: `import { Icon } from "@iconify/react";
import { LogoLinkCard } from "@/components/ui/logo-link-card";

<LogoLinkCard
  href="https://example.com"
  logo={<Icon icon="lucide:box" className="size-5" aria-hidden="true" />}
  title="Example project"
  subtitle="Open source"
  description="The whole card is the link; the badge lifts on hover."
/>`,
      },
      {
        name: "Spinner",
        file: "spinner.tsx",
        importPath: "@/components/ui/spinner",
        exports: ["Spinner"],
        description:
          'A spinning loader icon with role="status", sized through className. Use it inline wherever something is loading.',
        props: [
          { name: "icon", type: "string", description: 'Iconify icon name. Defaults to "lucide:loader-2".' },
          { name: "className", type: "string", description: "Size and color classes (default size-4)." },
        ],
        client: false,
        dependsOn: ["@iconify/react"],
        usage: `import { Spinner } from "@/components/ui/spinner";

<Spinner />
<Spinner className="size-6 text-primary" />
<Spinner icon="lucide:loader" className="size-8" />`,
      },
      {
        name: "Loading",
        file: "loading.tsx",
        importPath: "@/components/ui/loading",
        exports: ["Loading", "LoadingProps", "default"],
        description:
          "A large centered spinner that reserves vertical space for page or section placeholders. It is also the default export, so it can serve directly as a route's loading.tsx.",
        props: [
          { name: "label", type: "string", description: 'Screen-reader text. Defaults to "Loading".' },
          { name: "className", type: "string", description: "Classes for the spinner icon." },
          { name: "containerClassName", type: "string", description: "Classes for the container; override min-h-* to change the reserved height." },
        ],
        client: false,
        usage: `import { Loading } from "@/components/ui/loading";

<Loading containerClassName="min-h-24" />

// app/(route)/loading.tsx
export { default } from "@/components/ui/loading";`,
      },
      {
        name: "Widget card",
        file: "widget-card.tsx",
        importPath: "@/components/ui/widget-card",
        exports: ["WidgetCard", "WidgetCardFallback"],
        description:
          "A dashboard tile with a fixed header (title, optional actions and remove button) above a scrolling body that fills its parent's height. WidgetCardFallback is the placeholder for a widget that failed to load.",
        props: [
          { name: "title", type: "React.ReactNode", description: "Header title." },
          { name: "headerActions", type: "React.ReactNode", description: "Extra controls after the title." },
          { name: "onRemove", type: "() => void", description: "Shows a remove button when provided." },
          {
            name: "dragHandleClassName",
            type: "string",
            description: 'Class on the header for drag-and-drop grids. Defaults to "widget-drag-handle".',
          },
          { name: "children", type: "React.ReactNode", description: "Tile body." },
        ],
        client: true,
        dependsOn: ["simplebar-react", "@iconify/react"],
        usage: `import { WidgetCard, WidgetCardFallback } from "@/components/ui/widget-card";

<div className="grid h-40 grid-cols-2 gap-3">
  <WidgetCard title="Revenue" onRemove={() => setVisible(false)}>
    <p className="text-2xl font-semibold">$12.4k</p>
  </WidgetCard>
  <WidgetCardFallback />
</div>`,
      },
      {
        name: "YouTube embed",
        file: "youtube-embed.tsx",
        importPath: "@/components/ui/youtube-embed",
        exports: ["YouTubeEmbed", "YouTubeEmbedProps"],
        description:
          "A responsive 16:9 video or playlist embed from any watch, share, embed or shorts URL, or from explicit ids. It uses the privacy-enhanced domain and lazy loading by default.",
        props: [
          { name: "url", type: "string", description: "Any video URL; a list= param embeds the playlist." },
          { name: "videoId / playlistId", type: "string", description: "Explicit ids instead of a URL." },
          { name: "start", type: "number", description: "Start offset in seconds (single videos only)." },
          { name: "privacyEnhanced", type: "boolean", description: "Use the no-cookie domain. Defaults to true." },
          { name: "loading", type: '"eager" | "lazy"', description: 'Iframe loading. Defaults to "lazy".' },
          { name: "fallback", type: "React.ReactNode", description: "Shown when no valid id could be resolved." },
        ],
        client: false,
        usage: `import { YouTubeEmbed } from "@/components/ui/youtube-embed";

<YouTubeEmbed url="https://www.youtube.com/watch?v=VIDEO_ID" className="max-w-xl" />`,
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  /* Navigation                                                          */
  /* ------------------------------------------------------------------ */
  {
    id: "navigation",
    title: "Navigation",
    description: "Menus, links, tabs and disclosure controls for moving around and revealing content.",
    entries: [
      {
        name: "Navigation menu",
        file: "navigation-menu.tsx",
        importPath: "@/components/ui/navigation-menu",
        exports: [
          "NavigationMenu",
          "NavigationMenuList",
          "NavigationMenuItem",
          "NavigationMenuTrigger",
          "NavigationMenuContent",
          "NavigationMenuViewport",
          "NavigationMenuIndicator",
          "NavigationMenuLink",
          "navigationMenuTriggerStyle",
        ],
        description:
          "A site navigation bar with dropdown panels. Panels render in place by default; `viewport` uses one shared animated panel and `openUpwards` opens them above the menu, for example in a footer.",
        props: [
          { name: "viewport", type: "boolean", description: "NavigationMenu: render every panel in one shared viewport. Defaults to false." },
          { name: "openUpwards", type: "boolean", description: "NavigationMenu: open panels above the menu. Defaults to false." },
          { name: "chevron", type: "boolean", description: "NavigationMenuTrigger: show the chevron. Defaults to true." },
          { name: "asChild", type: "boolean", description: "NavigationMenuLink: render onto a Next.js Link." },
        ],
        client: true,
        dependsOn: ["@radix-ui/react-navigation-menu", "class-variance-authority", "@iconify/react"],
        usage: `import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

<NavigationMenu>
  <NavigationMenuList>
    <NavigationMenuItem>
      <NavigationMenuTrigger>Products</NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul className="grid w-64 gap-1 p-2">
          <li>
            <NavigationMenuLink asChild>
              <Link href="/analytics" className="block rounded-sm px-3 py-2 text-sm hover:bg-accent">
                Analytics
              </Link>
            </NavigationMenuLink>
          </li>
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
    <NavigationMenuItem>
      <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
        <Link href="/pricing">Pricing</Link>
      </NavigationMenuLink>
    </NavigationMenuItem>
  </NavigationMenuList>
</NavigationMenu>`,
      },
      {
        name: "Nav link",
        file: "nav-link.tsx",
        importPath: "@/components/ui/nav-link",
        exports: ["NavLink", "NavLinkProps"],
        description:
          'A Next.js link that knows when it points at the current page. On its own page it renders as a non-interactive span with aria-current="page"; with match="prefix" it also shows as active on nested routes.',
        props: [
          { name: "href", type: "string", description: "Link target." },
          { name: "match", type: '"exact" | "prefix"', description: 'How the active state is matched. Defaults to "exact".' },
          { name: "activeClassName", type: "string", description: "Classes applied only when active." },
          { name: "...props", type: 'Omit<React.ComponentProps<typeof Link>, "href">', description: "Any Next.js Link prop." },
        ],
        client: true,
        dependsOn: ["next"],
        usage: `import { NavLink } from "@/components/ui/nav-link";

<nav className="flex gap-4 text-sm">
  <NavLink href="/dashboard">Dashboard</NavLink>
  <NavLink href="/docs" match="prefix">Docs</NavLink>
  <NavLink href="/account">Account</NavLink>
</nav>`,
      },
      {
        name: "Tabs",
        file: "tabs.tsx",
        importPath: "@/components/ui/tabs",
        exports: ["Tabs", "TabsList", "TabsTrigger", "TabsContent"],
        description:
          "Tabbed panels that switch content in place. A horizontal list renders as a row of pills; a vertical one renders as a sidebar-style column.",
        props: [
          { name: "defaultValue", type: "string", description: "Tabs: initially active tab when uncontrolled." },
          { name: "value", type: "string", description: "Tabs: controlled active tab." },
          { name: "onValueChange", type: "(value: string) => void", description: "Tabs: called when the active tab changes." },
          { name: "orientation", type: '"horizontal" | "vertical"', description: 'Tabs: layout direction. Defaults to "horizontal".' },
          { name: "value (trigger/content)", type: "string", description: "TabsTrigger / TabsContent: which tab they belong to." },
        ],
        client: true,
        dependsOn: ["@radix-ui/react-tabs"],
        usage: `import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

<Tabs defaultValue="overview">
  <TabsList>
    <TabsTrigger value="overview">Overview</TabsTrigger>
    <TabsTrigger value="activity">Activity</TabsTrigger>
  </TabsList>
  <TabsContent value="overview">Overview panel.</TabsContent>
  <TabsContent value="activity">Activity panel.</TabsContent>
</Tabs>

<Tabs defaultValue="general" orientation="vertical" className="flex gap-4">
  <TabsList>
    <TabsTrigger value="general">General</TabsTrigger>
    <TabsTrigger value="security">Security</TabsTrigger>
  </TabsList>
  <TabsContent value="general">General settings.</TabsContent>
  <TabsContent value="security">Security settings.</TabsContent>
</Tabs>`,
      },
      {
        name: "Accordion",
        file: "accordion.tsx",
        importPath: "@/components/ui/accordion",
        exports: ["Accordion", "AccordionItem", "AccordionTrigger", "AccordionContent"],
        description:
          "A stack of collapsible sections with animated open and close, for FAQs or grouped settings. Triggers can show an optional leading icon tile.",
        props: [
          { name: "type", type: '"single" | "multiple"', description: "Accordion: whether one or many items can be open." },
          { name: "collapsible", type: "boolean", description: 'Accordion (type="single"): allow closing the open item.' },
          { name: "defaultValue", type: "string | string[]", description: "Accordion: initially open item(s)." },
          { name: "value", type: "string", description: "AccordionItem: unique item value." },
          { name: "icon", type: "string", description: "AccordionTrigger: optional leading Iconify icon." },
          { name: "chevronIcon", type: "string", description: 'AccordionTrigger: chevron icon. Defaults to "mdi:chevron-down".' },
        ],
        client: true,
        dependsOn: ["@radix-ui/react-accordion", "@iconify/react"],
        usage: `import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

<Accordion type="single" collapsible defaultValue="a">
  <AccordionItem value="a">
    <AccordionTrigger icon="mdi:compass-outline">What is this?</AccordionTrigger>
    <AccordionContent>A short answer to the question.</AccordionContent>
  </AccordionItem>
  <AccordionItem value="b">
    <AccordionTrigger>Can I remove it?</AccordionTrigger>
    <AccordionContent>Yes, delete the page and its link.</AccordionContent>
  </AccordionItem>
</Accordion>`,
      },
      {
        name: "Collapsible",
        file: "collapsible.tsx",
        importPath: "@/components/ui/collapsible",
        exports: ["Collapsible", "CollapsibleProps", "CollapsibleRoot", "CollapsibleTrigger", "CollapsibleContent"],
        description:
          "A single disclosure with a chevron trigger and a measured height animation, controlled or uncontrolled. The raw CollapsibleRoot, CollapsibleTrigger and CollapsibleContent parts cover layouts where the trigger sits apart from the content.",
        props: [
          { name: "label", type: "React.ReactNode", description: "Text next to the chevron in the default trigger." },
          { name: "open", type: "boolean", description: "Controlled open state. Leave undefined for uncontrolled." },
          { name: "defaultOpen", type: "boolean", description: "Initial state when uncontrolled." },
          { name: "onOpenChange", type: "(open: boolean) => void", description: "Called when it opens or closes." },
          { name: "trigger", type: "(open: boolean) => React.ReactNode", description: "Fully custom trigger contents." },
          { name: "transitionMs", type: "number", description: "Height animation duration. Defaults to 200." },
        ],
        client: true,
        dependsOn: ["@radix-ui/react-collapsible", "@iconify/react"],
        usage: `import { Collapsible } from "@/components/ui/collapsible";

<Collapsible label="Show details" open={open} onOpenChange={setOpen}>
  <p className="py-2 text-sm text-muted-foreground">Hidden details go here.</p>
</Collapsible>`,
      },
      {
        name: "Social link",
        file: "social-link.tsx",
        importPath: "@/components/ui/social-link",
        exports: ["SocialLink", "SocialLinks", "SocialLinkItem", "SocialLinkProps", "SocialLinksProps"],
        description:
          "Icon links to external profiles or any URL; external links open in a new tab. SocialLinks renders a row of them and skips entries with an empty href.",
        props: [
          { name: "links", type: "{ label: string; href: string; icon: string }[]", description: "SocialLinks: the links to render." },
          { name: "showLabel", type: "boolean", description: "Show the label text next to the icon." },
          { name: "linkClassName", type: "string", description: "SocialLinks: classes for each link." },
          { name: "iconClassName", type: "string", description: "Classes for each icon." },
        ],
        client: false,
        dependsOn: ["next", "@iconify/react"],
        usage: `import { SocialLinks } from "@/components/ui/social-link";

<SocialLinks
  links={[
    { label: "Website", href: "https://example.com", icon: "lucide:globe" },
    { label: "Feed", href: "https://example.com/feed", icon: "lucide:rss" },
    { label: "Email", href: "mailto:hello@example.com", icon: "lucide:mail" },
  ]}
/>`,
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  /* Layout                                                              */
  /* ------------------------------------------------------------------ */
  {
    id: "layout",
    title: "Layout",
    description: "Headings, dividers, scroll containers and scrolling cards for structuring pages.",
    entries: [
      {
        name: "Section header",
        file: "section-header.tsx",
        importPath: "@/components/ui/section-header",
        exports: ["SectionHeader", "SectionHeaderProps"],
        description: "A section title rendered inside a bordered pill, for example above a landing-page section.",
        props: [
          { name: "as", type: '"h1" | "h2" | "h3" | "h4"', description: 'Heading level. Defaults to "h2".' },
          { name: "innerClassName", type: "string", description: "Classes for the inner pill." },
          { name: "...props", type: 'React.ComponentProps<"h2">', description: "Any heading attribute." },
        ],
        client: false,
        usage: `import { SectionHeader } from "@/components/ui/section-header";

<SectionHeader as="h3">Section header</SectionHeader>`,
      },
      {
        name: "Banner header",
        file: "banner-header.tsx",
        importPath: "@/components/ui/banner-header",
        exports: ["BannerHeader", "BannerHeaderProps"],
        description: "A large hero h1 with a soft text glow that follows the theme.",
        props: [
          { name: "glowBlur", type: "number", description: "Glow blur radius in px; 0 disables it. Defaults to 5." },
          { name: "glowColor", type: "string", description: 'Any CSS color. Defaults to "var(--foreground)".' },
          { name: "...props", type: 'React.ComponentProps<"h1">', description: "Any h1 attribute." },
        ],
        client: false,
        usage: `import { BannerHeader } from "@/components/ui/banner-header";

<BannerHeader>Banner header</BannerHeader>
<BannerHeader glowBlur={0}>No glow</BannerHeader>`,
      },
      {
        name: "Separator",
        file: "separator.tsx",
        importPath: "@/components/ui/separator",
        exports: ["Separator"],
        description:
          "A hairline divider, horizontal or vertical. It is decorative by default; pass decorative={false} for a semantic separator.",
        props: [
          { name: "orientation", type: '"horizontal" | "vertical"', description: 'Direction. Defaults to "horizontal".' },
          { name: "decorative", type: "boolean", description: "Hide from assistive tech. Defaults to true." },
        ],
        client: true,
        dependsOn: ["@radix-ui/react-separator"],
        usage: `import { Separator } from "@/components/ui/separator";

<Separator />
<div className="flex h-5 items-center gap-3 text-sm">
  <span>Left</span>
  <Separator orientation="vertical" />
  <span>Right</span>
</div>`,
      },
      {
        name: "Scroll area",
        file: "scroll-area.tsx",
        importPath: "@/components/ui/scroll-area",
        exports: ["ScrollArea", "ScrollBar"],
        description:
          "A scroll container with a thin custom scrollbar, suited to small embedded lists. A vertical bar is included; add a horizontal ScrollBar child for sideways scrolling.",
        props: [
          { name: "className", type: "string", description: "ScrollArea: give it a bounded height or width." },
          { name: "orientation", type: '"vertical" | "horizontal"', description: 'ScrollBar: which axis. Defaults to "vertical".' },
        ],
        client: true,
        dependsOn: ["@radix-ui/react-scroll-area"],
        usage: `import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

<ScrollArea className="h-32 rounded-md border border-border">
  <ul className="p-3 text-sm">
    {items.map((item) => (
      <li key={item} className="py-1">{item}</li>
    ))}
  </ul>
</ScrollArea>

<ScrollArea className="w-full rounded-md border border-border">
  <div className="flex w-max gap-2 p-3">{chips}</div>
  <ScrollBar orientation="horizontal" />
</ScrollArea>`,
      },
      {
        name: "Scrollable card",
        file: "scrollable-card.tsx",
        importPath: "@/components/ui/scrollable-card",
        exports: ["ScrollableCard", "ScrollableCardProps"],
        description:
          "A Card with a fixed header and a scrolling body that fills the remaining height. Give it or its parent a bounded height.",
        props: [
          { name: "header", type: "React.ReactNode", description: "Title shown in the fixed header." },
          { name: "headerActions", type: "React.ReactNode", description: "Content at the right of the header." },
          { name: "bodyClassName", type: "string", description: "Classes for the scrolling body." },
          { name: "children", type: "React.ReactNode", description: "Body content." },
        ],
        client: true,
        dependsOn: ["simplebar-react"],
        usage: `import { Badge } from "@/components/ui/badge";
import { ScrollableCard } from "@/components/ui/scrollable-card";

<div className="h-48">
  <ScrollableCard header="Notifications" headerActions={<Badge>{items.length}</Badge>}>
    {items.map((item) => (
      <p key={item}>{item}</p>
    ))}
  </ScrollableCard>
</div>`,
      },
      {
        name: "Search card",
        file: "search-card.tsx",
        importPath: "@/components/ui/search-card",
        exports: ["SearchCard", "SearchCardProps"],
        description:
          "A ScrollableCard with a search input in its header, for filterable lists. Filtering itself is up to you.",
        props: [
          { name: "header", type: "React.ReactNode", description: "Title shown in the fixed header." },
          { name: "searchValue", type: "string", description: "Current search text." },
          {
            name: "onSearchChange",
            type: "React.ChangeEventHandler<HTMLInputElement>",
            description: "Called when the search text changes.",
          },
          { name: "searchPlaceholder", type: "string", description: "Search input placeholder." },
          { name: "searchLabel", type: "string", description: "Accessible label (defaults to the placeholder, then Search)." },
        ],
        client: true,
        dependsOn: ["simplebar-react"],
        usage: `import { SearchCard } from "@/components/ui/search-card";

const filtered = items.filter((i) => i.toLowerCase().includes(query.toLowerCase()));

<div className="h-48">
  <SearchCard
    header="Items"
    searchValue={query}
    onSearchChange={(e) => setQuery(e.target.value)}
    searchPlaceholder="Filter…"
  >
    {filtered.map((i) => (
      <p key={i}>{i}</p>
    ))}
  </SearchCard>
</div>`,
      },
      {
        name: "Page scroll area",
        file: "page-scroll-area.tsx",
        importPath: "@/components/ui/page-scroll-area",
        exports: ["PageScrollArea"],
        description:
          "A full-viewport-height page scroller with a thin custom scrollbar, used to wrap a page's whole content instead of letting the body scroll. Its content is a full-height flex column, so a footer with mt-auto sits at the bottom.",
        props: [
          { name: "children", type: "React.ReactNode", description: "Page content." },
          { name: "className", type: "string", description: "Override the default h-dvh height." },
        ],
        client: true,
        dependsOn: ["simplebar-react"],
        usage: `import { PageScrollArea } from "@/components/ui/page-scroll-area";

<PageScrollArea>
  <main className="p-6">Page content</main>
  <footer className="mt-auto border-t border-border p-3 text-xs">Footer</footer>
</PageScrollArea>`,
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  /* Motion                                                              */
  /* ------------------------------------------------------------------ */
  {
    id: "motion",
    title: "Motion",
    description: "Scroll-triggered reveals and animated text effects.",
    entries: [
      {
        name: "Section fade-in",
        file: "section-fade-in.tsx",
        importPath: "@/components/ui/section-fade-in",
        exports: ["SectionFadeIn", "SectionFadeInProps"],
        description: "Fades and slides its children up when the section scrolls into view.",
        props: [
          { name: "delay", type: "number", description: "Minimum seconds after mount before animating. Defaults to 0." },
          { name: "duration", type: "number", description: "Animation duration in seconds. Defaults to 0.7." },
          { name: "distance", type: "number", description: "Vertical offset in px to rise from. Defaults to 32." },
          { name: "amount", type: "number", description: "Fraction visible (0-1) that triggers it. Defaults to 0.2." },
          { name: "once", type: "boolean", description: "Animate only the first time. Defaults to true." },
        ],
        client: true,
        dependsOn: ["framer-motion"],
        usage: `import { SectionFadeIn } from "@/components/ui/section-fade-in";

<SectionFadeIn>
  <p>Fades and rises into view when scrolled to.</p>
</SectionFadeIn>`,
      },
      {
        name: "Section construct-in",
        file: "section-construct-in.tsx",
        importPath: "@/components/ui/section-construct-in",
        exports: ["SectionConstructIn", "SectionConstructInProps"],
        description:
          "A section that draws its own border when scrolled into view, then fades in its content while the text decodes from scrambled characters. The decode effect is skipped for reduced-motion users.",
        props: [
          { name: "strokeClassName", type: "string", description: 'stroke-* class for the border. Defaults to "stroke-primary".' },
          { name: "duration", type: "number", description: "Seconds for the border to draw. Defaults to 3." },
          { name: "delay", type: "number", description: "Seconds before the border starts. Defaults to 0." },
          { name: "scrambleDurationMs", type: "number", description: "Text decode duration. Defaults to 820." },
          { name: "scrollable", type: "boolean", description: "Wrap content in a scroll area capped at maxHeight." },
          { name: "once", type: "boolean", description: "Animate only the first time. Defaults to true." },
        ],
        client: true,
        dependsOn: ["framer-motion", "simplebar-react"],
        usage: `import { SectionConstructIn } from "@/components/ui/section-construct-in";

<SectionConstructIn strokeClassName="stroke-primary">
  <p className="p-4 text-sm">The border draws itself, then the text decodes.</p>
</SectionConstructIn>`,
      },
      {
        name: "Scramble typing",
        file: "scramble-typing.tsx",
        importPath: "@/components/ui/scramble-typing",
        exports: ["DisappearReplace", "SmoothReplace", "CrunchReplace", "Stream", "Crunch", "ReplaceProps", "StreamProps"],
        description:
          'Client-only text effects built on a "scramble then settle" typing animation: rotating message variants (DisappearReplace, SmoothReplace, CrunchReplace), a streaming typer (Stream) and a decorative glyph line (Crunch). Wrap part of a message in < and > to render it in the primary color.',
        props: [
          { name: "messages", type: "string[]", description: "Replace variants: messages to rotate through." },
          { name: "averageDelayMs", type: "number", description: "Replace variants: average wait before the next message." },
          { name: "random", type: "boolean", description: "Replace variants: pick the next message randomly." },
          { name: "text", type: "string", description: "Stream: the text to type." },
          { name: "scrambleSpeed", type: "number", description: "Stream: scramble speed (required)." },
          { name: "delay", type: "number", description: "Stream: ms before typing starts (required)." },
        ],
        client: true,
        usage: `import { Crunch, CrunchReplace, DisappearReplace, Stream } from "@/components/ui/scramble-typing";

<DisappearReplace messages={["Ship <faster>", "Build <better>"]} averageDelayMs={1500} />
<CrunchReplace messages={["Hello", "Bonjour", "Hola"]} averageDelayMs={1500} />
<Stream text="Streaming text, one scrambled character at a time." scrambleSpeed={40} delay={0} />
<Crunch />`,
      },
      {
        name: "Scramble wrappers",
        file: "scramble-wrappers.tsx",
        importPath: "@/components/ui/scramble-wrappers",
        exports: ["SmoothReplace", "DisappearReplace", "CrunchReplace", "ReplaceProps"],
        description:
          "Server-renderable wrappers around the Replace text effects that add a noscript fallback containing every message, so the copy stays visible to crawlers and visitors without JavaScript.",
        props: [
          { name: "messages", type: "string[]", description: "Messages to rotate through (accent markup is stripped in the fallback)." },
          { name: "averageDelayMs", type: "number", description: "Average wait before the next message." },
          { name: "random", type: "boolean", description: "Pick the next message randomly." },
          { name: "className", type: "string", description: "Classes for the wrapper element." },
        ],
        client: false,
        usage: `import { SmoothReplace } from "@/components/ui/scramble-wrappers";

<SmoothReplace messages={["Reusable components", "Consistent tokens", "Accessible defaults"]} averageDelayMs={2500} />`,
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  /* Calendar                                                          */
  /* ------------------------------------------------------------------ */
  {
    id: "calendar",
    title: "Calendar",
    description:
      "A props-driven month / week / day event calendar in src/components/calendar, built on the CalendarEvent type in src/lib/calendar/types.ts. Use CalendarView for the full experience, or the individual views to compose your own.",
    entries: [
      {
        name: "Calendar view",
        file: "calendar-view.tsx",
        importPath: "@/components/calendar/calendar-view",
        exports: ["CalendarView", "CalendarViewProps"],
        description:
          "The complete calendar: a toolbar (title, view switcher, previous / today / next, upcoming toggle), the month, week or day view, an upcoming sidebar (a column from md up, a drawer on mobile) and an event details dialog. Date and view can be controlled or uncontrolled. Give the root a definite height; the views fill it.",
        props: [
          { name: "events", type: "readonly CalendarEvent<TMeta>[]", description: "The events to show. Times are placed on the viewer's local calendar day." },
          { name: "date / defaultDate / onDateChange", type: "Date / Date / (date: Date) => void", description: "Controlled or initial anchor date. Without either, it opens on today once mounted." },
          { name: "view / defaultView / onViewChange", type: '"month" | "week" | "day"', description: 'Controlled or initial view. defaultView defaults to "month".' },
          { name: "views", type: "CalendarViewMode[]", description: "Views offered in the switcher (hidden when only one). Defaults to all three." },
          { name: "selectedDate", type: "Date | null", description: "Highlighted day. Purely presentational; you own the state." },
          { name: "onSelectDate", type: "(date: Date, view: CalendarViewMode) => void", description: "A day cell (month) or 30-minute slot (week/day) was clicked." },
          { name: "onSelectEvent", type: "(event: CalendarEvent<TMeta>) => void", description: "An event was clicked." },
          { name: "showEventDialog", type: "boolean", description: "Open the built-in details dialog on event click. Defaults to true." },
          { name: "renderEventDetails", type: "(event: CalendarEvent<TMeta>) => ReactNode", description: "Replaces EventCard inside the details dialog." },
          { name: "renderEvent", type: "RenderCalendarEvent<TMeta>", description: "Replaces the default chip content in every view and the upcoming list." },
          { name: "categories", type: "CalendarCategories", description: "Map of category key to { label, color?, className? }." },
          { name: "labels", type: "Partial<CalendarLabels>", description: "Override any user-visible string (translation or rewording)." },
          { name: "weekStartsOn", type: "0 | 1 | 2 | 3 | 4 | 5 | 6", description: "0 = Sunday (default) to 6 = Saturday." },
          { name: "today", type: "Date | null", description: '"Now" for highlights, the now-line and the upcoming list. Omitted: a live clock started after hydration. Pass a fixed date for demos and tests.' },
          { name: "showUpcoming / defaultUpcomingOpen", type: "boolean", description: "Offer the upcoming sidebar (default true) and its initial state (defaults to open from md up)." },
          { name: "toolbarExtra", type: "ReactNode", description: "Extra content at the end of the toolbar." },
          { name: "slotHeight / scrollToHour / maxEventsPerDay", type: "number", description: "Passed through to the time grid and the month view." },
          { name: "className", type: "string", description: 'Root classes. Set a definite height, e.g. "h-[44rem]" (default "h-[40rem]").' },
        ],
        client: true,
        dependsOn: ["date-fns", "@iconify/react", "simplebar-react"],
        usage: `"use client";

import { useState } from "react";
import { CalendarView } from "@/components/calendar/calendar-view";
import type { CalendarCategories, CalendarEvent } from "@/lib/calendar/types";

const categories: CalendarCategories = {
  meeting: { label: "Meeting", color: "primary" },
  deadline: { label: "Deadline", color: "destructive" },
};

const events: CalendarEvent[] = [
  { id: 1, title: "Team standup", start: new Date(2026, 9, 5, 9, 30), end: new Date(2026, 9, 5, 9, 45), category: "meeting" },
  { id: 2, title: "Report due", start: new Date(2026, 9, 9), allDay: true, category: "deadline" },
];

export function TeamCalendar() {
  const [selected, setSelected] = useState<Date | null>(null);
  return (
    <CalendarView
      events={events}
      categories={categories}
      selectedDate={selected}
      onSelectDate={(date) => setSelected(date)}
      onSelectEvent={(event) => console.log(event.title)}
      weekStartsOn={1}
      className="h-[44rem]"
    />
  );
}`,
      },
      {
        name: "Calendar view (client only)",
        file: "calendar-view-client.tsx",
        importPath: "@/components/calendar/calendar-view-client",
        exports: ["CalendarViewClient"],
        description:
          "CalendarView loaded with next/dynamic and ssr: false, with a pulsing placeholder while it loads. Use it when events carry absolute instants (ISO strings with an offset) and the server's timezone may differ from the viewer's, which would otherwise mismatch day placement on hydration. Events built from local wall-clock dates don't need it.",
        props: [{ name: "...props", type: "CalendarViewProps", description: "Same props as CalendarView." }],
        client: true,
        usage: `import { CalendarViewClient } from "@/components/calendar/calendar-view-client";

<CalendarViewClient
  events={[{ id: "launch", title: "Launch", start: "2026-10-20T17:00:00Z", end: "2026-10-20T18:00:00Z" }]}
  defaultView="week"
/>`,
      },
      {
        name: "Month calendar",
        file: "month-calendar.tsx",
        importPath: "@/components/calendar/month-calendar",
        exports: ["MonthCalendar", "MonthCalendarProps"],
        description:
          'A vertically scrolling month grid that loads months endlessly in both directions and reports the month at the center of the viewport through onDateChange. Each day shows up to maxEventsPerDay chips and a "+N more" link. Needs a parent with a definite height.',
        props: [
          { name: "events", type: "readonly CalendarEvent<TMeta>[]", description: "The events to show." },
          { name: "date", type: "Date", description: "Required. The active month (any date inside it)." },
          { name: "onDateChange", type: "(date: Date) => void", description: "Required. Fired with the 1st of whichever month scrolls to the center." },
          { name: "onSelectDate", type: "(date: Date) => void", description: "Fired when a day cell is clicked." },
          { name: "onSelectEvent", type: "(event: CalendarEvent<TMeta>) => void", description: "Fired when an event chip is clicked." },
          { name: "onShowMore", type: "(date: Date) => void", description: 'Fired by a day\'s "+N more" link. Defaults to onSelectDate.' },
          { name: "now", type: "Date | null", description: "Current time, for the today highlight. Omitted: none." },
          { name: "maxEventsPerDay", type: "number", description: 'Chips per day before "+N more". Defaults to 3.' },
          { name: "renderEvent / categories / labels / weekStartsOn / selectedDate", type: "-", description: "As on CalendarView." },
        ],
        client: true,
        dependsOn: ["date-fns", "simplebar-react"],
        usage: `"use client";

import { useState } from "react";
import { MonthCalendar } from "@/components/calendar/month-calendar";

const [date, setDate] = useState(() => new Date());

<div className="h-[36rem] overflow-hidden rounded-md border border-border">
  <MonthCalendar events={events} date={date} onDateChange={setDate} now={new Date()} />
</div>`,
      },
      {
        name: "Week calendar",
        file: "week-calendar.tsx",
        importPath: "@/components/calendar/week-calendar",
        exports: ["WeekCalendar", "WeekCalendarProps"],
        description:
          "WeekView with touch-swipe paging: the previous and next weeks are pre-rendered either side, and a swipe calls onDateChange with the date a week earlier or later.",
        props: [
          { name: "date", type: "Date", description: "Required. Any date inside the week to show." },
          { name: "onDateChange", type: "(date: Date) => void", description: "Required. Called with the new anchor date after a swipe." },
          { name: "...props", type: "WeekViewProps<TMeta>", description: "Everything WeekView accepts." },
        ],
        client: true,
        dependsOn: ["date-fns", "simplebar-react"],
        usage: `"use client";

import { useState } from "react";
import { WeekCalendar } from "@/components/calendar/week-calendar";

const [date, setDate] = useState(() => new Date());

<div className="h-[36rem] overflow-hidden rounded-md border border-border">
  <WeekCalendar events={events} date={date} onDateChange={setDate} weekStartsOn={1} />
</div>`,
      },
      {
        name: "Week view",
        file: "week-view.tsx",
        importPath: "@/components/calendar/week-view",
        exports: ["WeekView", "WeekViewProps"],
        description:
          "One week as a 7-column, 30-minute time grid with an all-day row, a now-line and overlapping events laid out side by side. It has no paging of its own; use WeekCalendar for swipe navigation.",
        props: [
          { name: "date", type: "Date", description: "Required. Any date inside the week to show." },
          { name: "weekStartsOn", type: "0 | 1 | 2 | 3 | 4 | 5 | 6", description: "Defaults to 0 (Sunday)." },
          { name: "events", type: "readonly CalendarEvent<TMeta>[]", description: "The events to show." },
          { name: "now", type: "Date | null", description: "Current time. Omitted: no now-line or today highlight." },
          { name: "onSelectDate", type: "(date: Date) => void", description: "Fired with the clicked 30-minute slot's start time." },
          { name: "onSelectEvent", type: "(event: CalendarEvent<TMeta>) => void", description: "Fired when an event is clicked." },
          { name: "slotHeight", type: "number", description: "Pixel height of one 30-minute slot. Defaults to 24." },
          { name: "scrollToHour", type: "number", description: "Hour scrolled to on mount. Defaults to 8." },
          { name: "renderEvent / categories / labels / selectedDate", type: "-", description: "As on CalendarView." },
        ],
        client: true,
        dependsOn: ["date-fns", "simplebar-react"],
        usage: `import { WeekView } from "@/components/calendar/week-view";

<div className="h-[36rem] overflow-hidden rounded-md border border-border">
  <WeekView events={events} date={new Date()} now={new Date()} onSelectDate={(slot) => console.log(slot)} />
</div>`,
      },
      {
        name: "Day calendar",
        file: "day-calendar.tsx",
        importPath: "@/components/calendar/day-calendar",
        exports: ["DayCalendar", "DayCalendarProps"],
        description:
          "DayView with touch-swipe paging: the neighbouring days are pre-rendered either side, and a swipe calls onDateChange with the next or previous day.",
        props: [
          { name: "date", type: "Date", description: "Required. The day to show." },
          { name: "onDateChange", type: "(date: Date) => void", description: "Required. Called with the new date after a swipe." },
          { name: "...props", type: "DayViewProps<TMeta>", description: "Everything DayView accepts." },
        ],
        client: true,
        dependsOn: ["date-fns", "simplebar-react"],
        usage: `"use client";

import { useState } from "react";
import { DayCalendar } from "@/components/calendar/day-calendar";

const [date, setDate] = useState(() => new Date());

<div className="h-[36rem] overflow-hidden rounded-md border border-border">
  <DayCalendar events={events} date={date} onDateChange={setDate} now={new Date()} />
</div>`,
      },
      {
        name: "Day view",
        file: "day-view.tsx",
        importPath: "@/components/calendar/day-view",
        exports: ["DayView", "DayViewProps"],
        description:
          "A single day as a 30-minute time grid with an all-day row and a now-line. It takes the same props as WeekView except weekStartsOn, and has no paging of its own; use DayCalendar for swipe navigation.",
        props: [
          { name: "date", type: "Date", description: "Required. The day to show." },
          { name: "events", type: "readonly CalendarEvent<TMeta>[]", description: "The events to show." },
          { name: "now", type: "Date | null", description: "Current time. Omitted: no now-line." },
          { name: "onSelectDate", type: "(date: Date) => void", description: "Fired with the clicked 30-minute slot's start time." },
          { name: "slotHeight / scrollToHour", type: "number", description: "Default to 24 (px per 30 minutes) and 8 (08:00)." },
        ],
        client: true,
        dependsOn: ["date-fns", "simplebar-react"],
        usage: `import { DayView } from "@/components/calendar/day-view";

<div className="h-[36rem] overflow-hidden rounded-md border border-border">
  <DayView events={events} date={new Date()} now={new Date()} scrollToHour={9} />
</div>`,
      },
      {
        name: "Event card",
        file: "event-card.tsx",
        importPath: "@/components/calendar/event-card",
        exports: ["EventCard", "EventCardProps"],
        description:
          "Read-only event details: optional image banner, when, title, category, location, description and a link (internal paths use next/link; absolute URLs open in a new tab). CalendarView shows it in its details dialog; use it alone for an event page or list.",
        props: [
          { name: "event", type: "CalendarEvent<TMeta>", description: "Required. The event to show." },
          { name: "categories", type: "CalendarCategories", description: "Resolves the event's category label and color." },
          { name: "labels", type: "Partial<CalendarLabels>", description: "Overrides, e.g. learnMore (the link text when the event has no urlLabel)." },
          { name: "showMedia", type: "boolean", description: "Show the image banner (an icon placeholder without imageUrl). Defaults to true when the event has an image." },
        ],
        client: false,
        dependsOn: ["@iconify/react"],
        usage: `import { EventCard } from "@/components/calendar/event-card";

<EventCard
  event={{
    id: "review",
    title: "Design review",
    start: new Date(2026, 9, 5, 10),
    end: new Date(2026, 9, 5, 11, 30),
    category: "meeting",
    description: "Walk through the new onboarding flow.",
    url: "/dashboard",
    urlLabel: "Open dashboard",
  }}
  categories={{ meeting: { label: "Meeting", color: "primary" } }}
  showMedia
/>`,
      },
      {
        name: "Upcoming sidebar",
        file: "upcoming-sidebar.tsx",
        importPath: "@/components/calendar/upcoming-sidebar",
        exports: ["UpcomingSidebar", "UpcomingSidebarProps"],
        description:
          "A chronological list of events ending today or later, with one toggle chip per category to filter it when categories are given. CalendarView renders it beside the calendar; use it alone for a dashboard widget.",
        props: [
          { name: "events", type: "readonly CalendarEvent<TMeta>[]", description: "The events to choose from." },
          { name: "now", type: "Date | null", description: "Required. Events ending on or after the start of this day are listed; null lists nothing." },
          { name: "onSelectEvent", type: "(event: CalendarEvent<TMeta>) => void", description: "Fired when an item is clicked." },
          { name: "onClose", type: "() => void", description: "Renders a close button when provided." },
          { name: "categories", type: "CalendarCategories", description: "Adds the category filter chips." },
          { name: "limit", type: "number", description: "Cap on listed events. Defaults to 50." },
          { name: "renderEvent / labels", type: "-", description: "As on CalendarView." },
        ],
        client: true,
        dependsOn: ["date-fns", "@iconify/react", "simplebar-react"],
        usage: `import { UpcomingSidebar } from "@/components/calendar/upcoming-sidebar";

<UpcomingSidebar
  events={events}
  now={new Date()}
  categories={categories}
  limit={6}
  onSelectEvent={(event) => console.log(event.title)}
  className="h-80"
/>`,
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  /* Billing                                                             */
  /* ------------------------------------------------------------------ */
  {
    id: "billing",
    title: "Billing",
    description:
      "Optional Stripe billing UI in src/components/billing. Billing is off unless all three STRIPE_* env vars are set; check isBillingEnabled() from @/lib/env before rendering these.",
    entries: [
      {
        name: "Checkout form",
        file: "checkout-form.tsx",
        importPath: "@/components/billing/checkout-form",
        exports: ["CheckoutForm"],
        description:
          "Stripe's embedded Payment Element, themed from the app's CSS tokens, for a subscription's first invoice or a one-time PaymentIntent. The /checkout page renders it after creating the client secret on the server; confirming here records nothing, the webhook does. Only used when billing is enabled (isBillingEnabled()).",
        props: [
          { name: "clientSecret", type: "string", description: "Required. From the subscription's first invoice or the PaymentIntent, created on the server." },
          { name: "returnUrl", type: "string", description: "Required. Absolute URL Stripe returns to after payment, e.g. /checkout/success." },
          { name: "publishableKey", type: "string", description: "Required. env.STRIPE_PUBLISHABLE_KEY, passed from the server at request time (not NEXT_PUBLIC_)." },
          { name: "submitLabel", type: "string", description: 'Pay button text. Defaults to "Pay now".' },
        ],
        client: true,
        dependsOn: ["@stripe/stripe-js", "@stripe/react-stripe-js"],
        usage: `// In a Server Component, as src/app/(protected)/checkout/page.tsx does
import { CheckoutForm } from "@/components/billing/checkout-form";
import { env } from "@/lib/env";

<CheckoutForm
  clientSecret={clientSecret}
  returnUrl={\`\${env.SITE_URL}/checkout/success?product=\${encodeURIComponent(product.key)}\`}
  publishableKey={env.STRIPE_PUBLISHABLE_KEY}
/>`,
      },
      {
        name: "Payment method card",
        file: "payment-method-card.tsx",
        importPath: "@/components/billing/payment-method-card",
        exports: ["PaymentMethodCard"],
        description:
          'Display-only saved card: brand icon and name, last four digits and expiry (marked "Expired" once past). Pass null for the "No saved card" state. The account page reads the summary live from Stripe on the server (src/lib/billing/customers.ts); full card numbers never reach the app. Shown only when billing is enabled (isBillingEnabled()).',
        props: [
          { name: "value", type: "PaymentMethodSummary | null", description: "Required. { brand, last4, expMonth, expYear } (each nullable), or null for the empty state." },
          { name: "className", type: "string", description: "Extra classes for the card." },
        ],
        client: false,
        dependsOn: ["@iconify/react"],
        usage: `import { PaymentMethodCard } from "@/components/billing/payment-method-card";

<PaymentMethodCard value={{ brand: "visa", last4: "4242", expMonth: 12, expYear: 2034 }} />
<PaymentMethodCard value={null} />`,
      },
      {
        name: "Manage billing button",
        file: "manage-billing-button.tsx",
        importPath: "@/components/billing/manage-billing-button",
        exports: ["ManageBillingButton"],
        description:
          "A form that posts to the manageBilling Server Action (src/lib/actions/billing.ts), which opens Stripe's Customer Portal (card, invoices, cancellation) and returns to /account. Works without client JavaScript and shows a pending state. With billing off (isBillingEnabled() false) the action returns to /account with a notice.",
        props: [
          { name: "variant", type: "ButtonVariant", description: 'Defaults to "secondary".' },
          { name: "children", type: "ReactNode", description: 'Button text. Defaults to "Manage billing".' },
          { name: "className", type: "string", description: "Classes for the button." },
        ],
        client: false,
        dependsOn: ["@iconify/react"],
        usage: `import { ManageBillingButton } from "@/components/billing/manage-billing-button";

<ManageBillingButton className="self-start" />`,
      },
      {
        name: "Pay with saved card button",
        file: "pay-with-saved-card-button.tsx",
        importPath: "@/components/billing/pay-with-saved-card-button",
        exports: ["PayWithSavedCardButton"],
        description:
          "One-click purchase of a one-time product with the customer's saved card, via the payWithSavedCard Server Action (src/lib/actions/billing.ts). With no saved card, or one that needs the customer (3-D Secure, a decline), it sends them to /checkout for that product. Render it from a Server Component: each render mints a fresh nonce used as the Stripe idempotency key. Only works when billing is enabled (isBillingEnabled()).",
        props: [
          { name: "productKey", type: "ProductKey", description: 'Required. A mode: "payment" product key from src/lib/billing/products.ts; the price comes from the catalog.' },
          { name: "children", type: "ReactNode", description: "Required. Button text." },
          { name: "variant", type: "ButtonVariant", description: 'Defaults to "primary".' },
          { name: "className", type: "string", description: "Classes for the button." },
        ],
        client: false,
        usage: `// In a Server Component (a page), with "lifetime" listed in src/lib/billing/products.ts
import { PayWithSavedCardButton } from "@/components/billing/pay-with-saved-card-button";
import { isBillingEnabled } from "@/lib/env";

{isBillingEnabled() ? <PayWithSavedCardButton productKey="lifetime">Buy again</PayWithSavedCardButton> : null}`,
      },
    ],
  },
];
