import {
    CONTEXT_V1 as odrlCtx,
    CONTEXT_URL_V1 as odrlCtxUrl,
} from "@digitalbazaar/odrl-context";
import {
    CONTEXT_V1 as vcExamplesV1Ctx,
    CONTEXT_URL_V1 as vcExamplesV1CtxUrl,
} from "@digitalbazaar/credentials-examples-context";
import dataIntegrityContext from "@digitalbazaar/data-integrity-context";
import multikeyContext from "@digitalbazaar/multikey-context";
import jsigs from "jsonld-signatures";
import jsonld from "jsonld";
import * as vc from "@digitalbazaar/vc";
import { getDid, getSchemas } from "./web3.js";

export const remoteDocuments = new Map();
remoteDocuments.set(vcExamplesV1CtxUrl, vcExamplesV1Ctx);
remoteDocuments.set(odrlCtxUrl, odrlCtx);
remoteDocuments.set(
    dataIntegrityContext.constants.CONTEXT_URL,
    dataIntegrityContext.contexts.get(dataIntegrityContext.constants.CONTEXT_URL)
);
remoteDocuments.set(
    multikeyContext.constants.CONTEXT_URL,
    multikeyContext.contexts.get(multikeyContext.constants.CONTEXT_URL)
);

// Khong can luu
remoteDocuments.set(
    "did:controller:zDnaeWzcHdM7gTqVhGY2n8TSf9UKDWoh9rT2YdoWGpsycr9DJ",
    {
        "@context": "https://w3id.org/security/v2",
        id: "did:controller:zDnaeWzcHdM7gTqVhGY2n8TSf9UKDWoh9rT2YdoWGpsycr9DJ",
        // actual keys are going to be added in the test suite before() block
        assertionMethod: [
            "did:avax:zDnaeWzcHdM7gTqVhGY2n8TSf9UKDWoh9rT2YdoWGpsycr9DJ",
        ],
        authentication: [],
    }
);

const { extendContextLoader } = jsigs;
const { defaultDocumentLoader } = vc;
// TODO: user https://github.com/veres-one/did-veres-one for gen document loader and gen did for authentication
export const dataloader = extendContextLoader(async (url) => {
    const remoteDocument = remoteDocuments.get(url);
    if (url === "credential:schema:event:hackathon") {
        // TODO: Get from BLC
        let data = await getSchemas(url);
        return {
            contextUrl: null,
            document: jsonld.clone(JSON.parse(data)),
            documentUrl: url,
        };
    }
    if (url === "did:avax:zDnaeWzcHdM7gTqVhGY2n8TSf9UKDWoh9rT2YdoWGpsycr9DJ") {
        let data = await getDid(url);

        return {
            contextUrl: null,
            document: jsonld.clone(JSON.parse(data)),
            documentUrl: url,
        };
    }
    if (url === "did:avax:zDnaeSMnptAKpH4AD41vTkwzjznW7yNetdRh9FJn8bJsbsdbw") {
        let data = await getDid(url);
        return {
            contextUrl: null,
            document: jsonld.clone(JSON.parse(data)),
            documentUrl: url,
        };
    }

    if (remoteDocument) {
        return {
            contextUrl: null,
            document: jsonld.clone(remoteDocument),
            documentUrl: url,
        };
    }

    return defaultDocumentLoader(url);
});
