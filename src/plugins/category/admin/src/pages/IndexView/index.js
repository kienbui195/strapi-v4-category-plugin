import React, { memo, useEffect } from "react";
import { useIntl } from "react-intl";
import { useMutation, useQuery, useQueryClient } from "react-query";
import get from "lodash/get";
import {
  DynamicTable,
  EmptyStateLayout,
  useNotification,
  useOverlayBlocker,
  useQueryParams,
  useFetchClient,
} from "@strapi/helper-plugin";
import {
  useNotifyAT,
  Box,
  Button,
  ContentLayout,
  HeaderLayout,
  SingleSelect,
  SingleSelectOption,
  Flex,
  Typography,
  // @ts-ignore
} from "@strapi/design-system";
import Plus from "@strapi/icons/Plus.js";

// @ts-ignore
import { api, getTrad, pluginId, pluginName } from "../../utils";
import { Layout, MenuRows, PaginationFooter } from "../../components";
import { useState } from "react";
import { getLocalLocale, saveLocalLocale } from "../../utils/function";

const QUERY_KEY = "category-index";

const IndexView = ({ history }) => {
  const { formatMessage } = useIntl();
  const { notifyStatus } = useNotifyAT();
  const toggleNotification = useNotification();
  const { lockApp, unlockApp } = useOverlayBlocker();
  const queryClient = useQueryClient();
  const [{ query }] = useQueryParams();
  const [locale, setLocale] = useState({
    list: [],
    selected: getLocalLocale() || "en",
  });

  const pageSize = get(query, "pageSize", 10);
  const page = get(query, "page", 1) * pageSize - pageSize;
  const { get: adminGet } = useFetchClient();

  const fetchParams = {
    populate: "*",
    pagination: {
      start: page,
      limit: pageSize,
    },
    locale: locale.selected,
  };

  const { data, refetch, status } = useQuery(
    QUERY_KEY,
    () => api.get(null, fetchParams),
    {
      onSuccess: () => {
        notifyStatus(
          formatMessage({
            id: getTrad("ui.loaded"),
            defaultMessage: "Data has been loaded",
          })
        );
      },
      onError: () => {
        toggleNotification({
          type: "warning",
          message: {
            id: getTrad("ui.error"),
            defaultMessage: "An error occured",
          },
        });
      },
      enabled: !!locale
    }
    
  );

  const getLocale = async () => {
    try {
      const res = await adminGet(
        `${process.env.STRAPI_ADMIN_BACKEND_URL}/i18n/locales`
      );
      setLocale((prev) => ({
        ...prev,
        list: res.data,
      }));
    } catch (err) {
      console.log("🚀 ~ getLocale ~ err:", err);
    }
  };

  useEffect(() => {
    getLocale();
  }, []);

  // @ts-ignore
  useEffect(() => {
    return async () => {
      await refetch();
    };
  }, [page, pageSize, locale.selected]);

  const deleteMutation = useMutation((id) => api.deleteAction(id), {
    onSuccess: async () => {
      await queryClient.invalidateQueries(QUERY_KEY);

      toggleNotification({
        type: "success",
        message: {
          id: getTrad("ui.deleted.category"),
          defaultMessage: "Category has been deleted",
        },
      });
    },
    onError: (err) => {
      // @ts-ignore
      if (err?.response?.data?.data) {
        toggleNotification({
          type: "warning",
          // @ts-ignore
          message: err.response.data.data,
        });
      } else {
        toggleNotification({
          type: "warning",
          message: {
            id: getTrad("ui.error"),
            defaultMessage: "An error occured",
          },
        });
      }
    },
    onSettled: () => {
      unlockApp();
    },
  });

  const onConfirmDelete = async (id) => {
    lockApp();

    try {
      await deleteMutation.mutateAsync(id);
    } catch (err) {
      unlockApp();
    }
  };

  const isLoading = status !== "success";
  // @ts-ignore
  const colCount = 3;
  // @ts-ignore
  const rowCount = (data?.data?.length ?? 0) + 1;
  const pageCount = data?.meta?.total
    ? Math.ceil(data.meta.total / data.meta.limit)
    : 1;

  const tableHeaders = [
    {
      name: "title",
      key: "title",
      metadatas: {
        label: formatMessage({
          id: getTrad("form.label.title"),
          defaultMessage: "Title",
        }),
        sortable: true,
      },
    },
    {
      name: "slug",
      key: "slug",
      metadatas: {
        label: formatMessage({
          id: getTrad("form.label.slug"),
          defaultMessage: "Slug",
        }),
        sortable: true,
      },
    },
    {
      name: "items",
      key: "items",
      metadatas: {
        label: formatMessage({
          id: getTrad("form.label.items"),
          defaultMessage: "Items",
        }),
        sortable: false,
      },
    },
  ];

  /**
   * @TODO - This primary action currently does not render when the `DynamicTable`
   * passes the `action` prop through to `EmptyStateLayout`. No idea why.
   */
  const PrimaryAction = ({ size = "L", variant = "default" }) => (
    <Button
      onClick={() => history.push(`/plugins/${pluginId}/create`)}
      startIcon={<Plus />}
      variant={variant}
      size={size}
    >
      {formatMessage({
        id: getTrad("ui.create.category"),
        defaultMessage: "Create new category",
      })}
    </Button>
  );

  return (
    <Layout
      isLoading={isLoading}
      title={formatMessage({
        id: getTrad("plugin.name"),
        defaultMessage: "Category",
      })}
    >
      <HeaderLayout
        title={formatMessage({
          id: getTrad("plugin.name"),
          defaultMessage: "Category",
        })}
        subtitle={formatMessage({
          id: getTrad("index.header.subtitle"),
          defaultMessage:
            "Customize the structure of categories and category items",
        })}
        primaryAction={<PrimaryAction />}
      />
      <ContentLayout>
        <Flex justifyContent="end" marginBottom={4}>
          <SingleSelect
            value={locale.selected}
            onChange={(val) => {
              setLocale((prev) => ({ ...prev, selected: val }));
              saveLocalLocale(val);
            }}
          >
            {locale.list.map((item, idx) => (
              <SingleSelectOption key={idx} value={item.code}>
                {item.name}
              </SingleSelectOption>
            ))}
          </SingleSelect>
        </Flex>
        <Box paddingBottom={10}>
          {!!data?.data?.length ? (
            <>
              <DynamicTable
                contentType="categories"
                isLoading={isLoading}
                headers={tableHeaders}
                rows={data.data}
                action={<PrimaryAction size="S" variant="secondary" />}
                onConfirmDelete={onConfirmDelete}
              >
                <MenuRows
                  data={data.data ?? []}
                  onClickClone={(id) =>
                    history.push(`/plugins/${pluginId}/clone/${id}`)
                  }
                  onClickEdit={(id) =>
                    history.push(`/plugins/${pluginId}/edit/${id}`)
                  }
                />
              </DynamicTable>
              <PaginationFooter pagination={{ pageCount }} />
            </>
          ) : (
            // @ts-ignore
            <EmptyStateLayout
              content={{
                id: getTrad("index.state.empty"),
                defaultMessage: "No categories found",
              }}
              action={<PrimaryAction size="S" variant="secondary" />}
            />
          )}
        </Box>
      </ContentLayout>
    </Layout>
  );
};

export default memo(IndexView);
