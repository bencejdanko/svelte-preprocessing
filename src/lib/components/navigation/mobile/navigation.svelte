<script>
    import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
    import { HamburgerMenu } from "svelte-radix";
</script>

<div
    class="mt-[10px] border-b-foreground border-b-4 border-double rounded-none flex p-2"
>
    <DropdownMenu.Root>
        <DropdownMenu.Trigger><HamburgerMenu size='30' /></DropdownMenu.Trigger>
        <DropdownMenu.Content>
            <DropdownMenu.Group>
                <DropdownMenu.Label>My Account</DropdownMenu.Label>
                <DropdownMenu.Separator />
                <DropdownMenu.Item>Profile</DropdownMenu.Item>
                <DropdownMenu.Item>Billing</DropdownMenu.Item>
                <DropdownMenu.Item>Team</DropdownMenu.Item>
                <DropdownMenu.Item>Subscription</DropdownMenu.Item>
            </DropdownMenu.Group>
        </DropdownMenu.Content>
    </DropdownMenu.Root>

    <span style="sans-serif;" class="text-2xl text-foreground ml-5">Bence Danko</span>
</div>
