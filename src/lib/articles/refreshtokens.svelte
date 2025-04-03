<script>
    import GlossaryTooltip from "$lib/components/glossary-tooltip/glossary-tooltip.svelte";
    import Gist from "$lib/components/gist/gist.svelte";
    import CodeBlock from "$lib/components/code-block/code-block.svelte";
</script>

<template lang=1>

- [The Problem](#1)
- [The Role of Refresh Tokens](#2)

# The Problem: Stateless Authentication @1

Rolling your own ??stateless-protocol?? for authentication makes for simpler development. `GET` requests and `POST` requests. *test one* and *test two*

[This article](https://medium.com/@jbyj/why-not-go-ahead-and-use-jwts-for-authentication-31810a4ce605)

# The Role of Refresh Tokens

Refreshing is a method to address the drawbacks of bearer tokens (presumably a ??jwt??.). It is difficult to detect a leak or abuse, such as from a ??csrf?? attack. Revokability is only possible by updating the secret, which affects users globally.

For the majority of use cases, a cookie-based auth should be the strongest security-wise. Because it's server managed, revokability is a non-issue, as is identification and malicious activity detection. 

# The Problem with Cookies

The issue with cookies is that they are not as scalable as JWTs. They require a server to manage them, and they are not as easily portable. A bearer token can be as easy as an `Authorization` header per request.

You can find the complete repo [here](https://github.com/bencejdanko/CS-166/tree/main/secure-auth).

![Figure 1: A diagram illustrating our design.](RefreshTokenRotation.svg)

</template>

<template lang=0>

Refreshing is a method to address the drawbacks of bearer tokens (presumably a ;;jwt;;.). It is difficult to detect a leak or abuse, such as from a ;;csrf;; attack. Revokability is only possible by updating the secret, which affects users globally.

For the majority of use cases, a cookie-based auth should be the strongest security-wise. Because it's server managed, revokability is a non-issue, as is identification and malicious activity detection. 

## The Problem with Cookies $2$

The issue with cookies is that they are not as scalable as JWTs. They require a server to manage them, and they are not as easily portable. A bearer token can be as easy as an `Authorization` header per request.

You can find the complete repo [here](https://github.com/bencejdanko/CS-166/tree/main/secure-auth).


[refresh token diagram | RefreshTokenRotation.svg | Figure 1: A diagram illustrating our design.]

</template>

<Gist gistUrl="https://gist.github.com/bencejdanko/9b400c5b167a90c498528ea2001e4161" />