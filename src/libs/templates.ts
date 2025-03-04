import { Block } from "@/components/pdf-constructor/features/core/types/block.types";
import { BlockId } from "@/components/pdf-constructor/shared/types/utils.types";

import { imageMock } from "@/shared/mock/image.mock";
import { loanTableMock } from "@/shared/mock/loan-table.mock";
import { tenantListMock } from "@/shared/mock/tenant-list.mock";

export const fetchTemplates = async (
  id: string
): Promise<Record<BlockId, Block>> => {
  // some basic elements
  if (id === "template-1") {
    return {
      ["1" as BlockId]: {
        id: "1" as BlockId,
        marginLeft: 0,
        marginRight: 0,
        marginTop: 0,
        marginBottom: 0,
        width: 100,
        parentId: null,
        type: "text",
        content: "Hello there",
        color: "#ff0000",
        bold: true,
        italic: true,
        underline: false,
        fontSize: 16,
        fontFamily: "Roboto",
      },
      ["2" as BlockId]: {
        id: "2" as BlockId,
        marginLeft: 0,
        marginRight: 0,
        marginTop: 0,
        marginBottom: 0,
        width: 25,
        parentId: null,
        type: "image",
        content: imageMock,
        ratio: 1,
      },
      ["3" as BlockId]: {
        id: "3" as BlockId,
        marginLeft: 0,
        marginRight: 0,
        marginTop: 0,
        marginBottom: 0,
        width: 100,
        parentId: null,
        type: "line",
        height: 4,
        color: "#000",
      },
      ["4" as BlockId]: {
        id: "4" as BlockId,
        marginLeft: 0,
        marginRight: 0,
        marginTop: 0,
        marginBottom: 0,
        width: 100,
        parentId: null,
        type: "text",
        content: "Some random elements here",
        color: "#000000",
        bold: false,
        italic: false,
        underline: true,
        fontSize: 16,
        fontFamily: "Roboto",
      },
    };
  }

  // columns stuff
  if (id === "template-2") {
    return {
      ["1" as BlockId]: {
        id: "1" as BlockId,
        marginLeft: 0,
        marginRight: 0,
        marginTop: 0,
        marginBottom: 0,
        width: 100,
        parentId: null,
        type: "text",
        content: "Placeholder text",
        color: "#000000",
        bold: false,
        italic: false,
        underline: false,
        fontSize: 16,
        fontFamily: "Roboto",
      },
      ["2" as BlockId]: {
        id: "2" as BlockId,
        marginLeft: 0,
        marginRight: 0,
        marginTop: 0,
        marginBottom: 0,
        width: 100,
        parentId: null,
        type: "column-group",
        children: ["3", "4"] as BlockId[],
        gap: 10,
      },
      ["3" as BlockId]: {
        id: "3" as BlockId,
        marginLeft: 0,
        marginRight: 0,
        marginTop: 0,
        marginBottom: 0,
        width: 50,
        parentId: "2" as BlockId,
        type: "column",
        children: ["5", "6"] as BlockId[],
      },
      ["4" as BlockId]: {
        id: "4" as BlockId,
        marginLeft: 0,
        marginRight: 0,
        marginTop: 0,
        marginBottom: 0,
        width: 50,
        parentId: "2" as BlockId,
        type: "column",
        children: ["7", "9", "8"] as BlockId[],
      },
      ["5" as BlockId]: {
        id: "5" as BlockId,
        marginLeft: 0,
        marginRight: 0,
        marginTop: 0,
        marginBottom: 0,
        width: 100,
        parentId: "3" as BlockId,
        type: "text",
        content: "Placeholder text",
        color: "#000000",
        bold: false,
        italic: false,
        underline: false,
        fontSize: 16,
        fontFamily: "Roboto",
      },
      ["6" as BlockId]: {
        id: "6" as BlockId,
        marginLeft: 0,
        marginRight: 0,
        marginTop: 0,
        marginBottom: 0,
        width: 100,
        parentId: "3" as BlockId,
        type: "image",
        content: imageMock,
        ratio: 1,
      },
      ["7" as BlockId]: {
        id: "7" as BlockId,
        marginLeft: 0,
        marginRight: 0,
        marginTop: 0,
        marginBottom: 0,
        width: 100,
        parentId: "4" as BlockId,
        type: "text",
        content: "Placeholder text",
        color: "#000000",
        bold: false,
        italic: false,
        underline: false,
        fontSize: 16,
        fontFamily: "Roboto",
      },
      ["8" as BlockId]: {
        id: "8" as BlockId,
        marginLeft: 0,
        marginRight: 0,
        marginTop: 0,
        marginBottom: 0,
        width: 100,
        parentId: "4" as BlockId,
        type: "text",
        content: "Placeholder text",
        color: "#000000",
        bold: false,
        italic: false,
        underline: false,
        fontSize: 16,
        fontFamily: "Roboto",
      },
      ["9" as BlockId]: {
        id: "9" as BlockId,
        marginLeft: 0,
        marginRight: 0,
        marginTop: 0,
        marginBottom: 0,
        width: 100,
        parentId: "4" as BlockId,
        type: "line",
        height: 4,
        color: "#000",
      },
      ["10" as BlockId]: {
        id: "10" as BlockId,
        marginLeft: 0,
        marginRight: 0,
        marginTop: 0,
        marginBottom: 0,
        width: 100,
        parentId: null,
        type: "line",
        height: 4,
        color: "#000",
      },
      ["11" as BlockId]: {
        id: "11" as BlockId,
        marginLeft: 0,
        marginRight: 0,
        marginTop: 0,
        marginBottom: 0,
        width: 100,
        parentId: null,
        type: "image",
        content: imageMock,
        ratio: 1,
      },
    };
  }

  // table stuff
  if (id === "template-3") {
    return {
      ["1" as BlockId]: {
        id: "1" as BlockId,
        marginLeft: 0,
        marginRight: 0,
        marginTop: 0,
        marginBottom: 0,
        width: 100,
        parentId: null,
        type: "text",
        content: "Placeholder text",
        color: "#000000",
        bold: false,
        italic: false,
        underline: false,
        fontSize: 16,
        fontFamily: "Roboto",
      },
      ["2" as BlockId]: {
        id: "2" as BlockId,
        marginLeft: 0,
        marginRight: 0,
        marginTop: 0,
        marginBottom: 0,
        width: 100,
        parentId: null,
        type: "column-group",
        children: ["3", "4"] as BlockId[],
        gap: 10,
      },
      ["3" as BlockId]: {
        id: "3" as BlockId,
        marginLeft: 0,
        marginRight: 0,
        marginTop: 0,
        marginBottom: 0,
        width: 50,
        parentId: "2" as BlockId,
        type: "column",
        children: ["5", "6"] as BlockId[],
      },
      ["4" as BlockId]: {
        id: "4" as BlockId,
        marginLeft: 0,
        marginRight: 0,
        marginTop: 0,
        marginBottom: 0,
        width: 50,
        parentId: "2" as BlockId,
        type: "column",
        children: ["7", "9", "8"] as BlockId[],
      },
      ["5" as BlockId]: {
        id: "5" as BlockId,
        marginLeft: 0,
        marginRight: 0,
        marginTop: 0,
        marginBottom: 0,
        width: 100,
        parentId: "3" as BlockId,
        type: "text",
        content: "Placeholder text 12",
        color: "#000000",
        bold: false,
        italic: false,
        underline: false,
        fontSize: 16,
        fontFamily: "Roboto",
      },
      ["6" as BlockId]: {
        id: "6" as BlockId,
        marginLeft: 0,
        marginRight: 0,
        marginTop: 0,
        marginBottom: 0,
        width: 100,
        parentId: "3" as BlockId,
        type: "image",
        content: imageMock,
        ratio: 1,
      },
      ["7" as BlockId]: {
        id: "7" as BlockId,
        marginLeft: 0,
        marginRight: 0,
        marginTop: 0,
        marginBottom: 0,
        width: 100,
        parentId: "4" as BlockId,
        type: "text",
        content: "Placeholder text",
        color: "#000000",
        bold: false,
        italic: false,
        underline: false,
        fontSize: 16,
        fontFamily: "Roboto",
      },
      ["8" as BlockId]: {
        id: "8" as BlockId,
        marginLeft: 0,
        marginRight: 0,
        marginTop: 0,
        marginBottom: 0,
        width: 100,
        parentId: "4" as BlockId,
        type: "text",
        content: "Placeholder text",
        color: "#000000",
        bold: false,
        italic: false,
        underline: false,
        fontSize: 16,
        fontFamily: "Roboto",
      },
      ["9" as BlockId]: {
        id: "9" as BlockId,
        marginLeft: 0,
        marginRight: 0,
        marginTop: 0,
        marginBottom: 0,
        width: 100,
        parentId: "4" as BlockId,
        type: "line",
        height: 4,
        color: "#000",
      },
      ["10" as BlockId]: {
        id: "10" as BlockId,
        marginLeft: 0,
        marginRight: 0,
        marginTop: 0,
        marginBottom: 0,
        width: 100,
        parentId: null,
        type: "line",
        height: 4,
        color: "#000",
      },
      ["11" as BlockId]: {
        id: "11" as BlockId,
        marginLeft: 0,
        marginRight: 0,
        marginTop: 0,
        marginBottom: 0,
        width: 43.65,
        parentId: null,
        type: "image",
        content: imageMock,
        ratio: 1,
      },
      ["12" as BlockId]: {
        id: "12" as BlockId,
        marginLeft: 0,
        marginRight: 0,
        marginTop: 0,
        marginBottom: 0,
        width: 100,
        parentId: null,
        type: "text",
        content: "Placeholder text",
        color: "#000000",
        bold: false,
        italic: false,
        underline: false,
        fontSize: 16,
        fontFamily: "Roboto",
      },
      ["14" as BlockId]: {
        id: "14" as BlockId,
        marginLeft: 0,
        marginRight: 0,
        marginTop: 0,
        marginBottom: 0,
        width: 100,
        parentId: null,
        type: "table",
        children: ["15", "18"] as BlockId[],
        paddingLeft: 7,
        paddingRight: 7,
        paddingTop: 7,
        paddingBottom: 7,
      },
      ["15" as BlockId]: {
        id: "15" as BlockId,
        marginLeft: 0,
        marginRight: 0,
        marginTop: 0,
        marginBottom: 0,
        width: 100,
        parentId: "14" as BlockId,
        type: "table-row",
        children: ["16", "17"] as BlockId[],
      },
      ["16" as BlockId]: {
        id: "16" as BlockId,
        marginLeft: 0,
        marginRight: 0,
        marginTop: 0,
        marginBottom: 0,
        width: 50,
        parentId: "15" as BlockId,
        type: "table-cell",
        children: ["21"] as BlockId[],
      },
      ["17" as BlockId]: {
        id: "17" as BlockId,
        marginLeft: 0,
        marginRight: 0,
        marginTop: 0,
        marginBottom: 0,
        width: 50,
        parentId: "15" as BlockId,
        type: "table-cell",
        children: ["22"] as BlockId[],
      },
      ["18" as BlockId]: {
        id: "18" as BlockId,
        marginLeft: 0,
        marginRight: 0,
        marginTop: 0,
        marginBottom: 0,
        width: 100,
        parentId: "14" as BlockId,
        type: "table-row",
        children: ["19", "20"] as BlockId[],
      },
      ["19" as BlockId]: {
        id: "19" as BlockId,
        marginLeft: 0,
        marginRight: 0,
        marginTop: 0,
        marginBottom: 0,
        width: 50,
        parentId: "18" as BlockId,
        type: "table-cell",
        children: ["23", "24"] as BlockId[],
      },
      ["20" as BlockId]: {
        id: "20" as BlockId,
        marginLeft: 0,
        marginRight: 0,
        marginTop: 0,
        marginBottom: 0,
        width: 50,
        parentId: "18" as BlockId,
        type: "table-cell",
        children: [] as BlockId[],
      },
      ["21" as BlockId]: {
        id: "21" as BlockId,
        marginLeft: 0,
        marginRight: 0,
        marginTop: 0,
        marginBottom: 0,
        width: 100,
        parentId: "16" as BlockId,
        type: "text",
        content: "Placeholder text",
        color: "#000000",
        bold: false,
        italic: false,
        underline: false,
        fontSize: 16,
        fontFamily: "Roboto",
      },
      ["22" as BlockId]: {
        id: "22" as BlockId,
        marginLeft: 0,
        marginRight: 0,
        marginTop: 0,
        marginBottom: 0,
        width: 30.51,
        parentId: "17" as BlockId,
        type: "image",
        content: imageMock,
        ratio: 1,
      },
      ["23" as BlockId]: {
        id: "23" as BlockId,
        marginLeft: 0,
        marginRight: 0,
        marginTop: 0,
        marginBottom: 0,
        width: 100,
        parentId: "19" as BlockId,
        type: "text",
        content: "Placeholder text",
        color: "#000000",
        bold: false,
        italic: false,
        underline: false,
        fontSize: 16,
        fontFamily: "Roboto",
      },
      ["24" as BlockId]: {
        id: "24" as BlockId,
        marginLeft: 0,
        marginRight: 0,
        marginTop: 0,
        marginBottom: 0,
        width: 100,
        parentId: "19" as BlockId,
        type: "line",
        height: 4,
        color: "#000",
      },
    };
  }

  if (id === "template-4") {
    return loanTableMock as Record<BlockId, Block>;
    // const request = await fetch(
    //   "http://localhost:3000/api/pdfConstructor/test",
    //   {
    //     method: "POST",
    //   }
    // );

    // const response = await request.json();
    // return response;
  }

  if (id === "template-5") {
    return tenantListMock as Record<BlockId, Block>;
    // const request = await fetch(
    //   "http://localhost:3000/api/pdfConstructor/test-2",
    //   {
    //     method: "POST",
    //   }
    // );

    // const response = await request.json();
    // console.log(response);
    // return response;
  }

  return {} as Record<BlockId, Block>;
};
