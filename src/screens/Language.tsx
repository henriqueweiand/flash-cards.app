import { useNavigation } from "@react-navigation/native";
import { Button, FlatList, HStack, Text, VStack, useToast } from "native-base";
import { useCallback, useEffect, useState } from "react";

import { CountryCard } from "@components/CardCoutry";
import { Loading } from "@components/Loading";
import { SafeArea } from "@components/SafeArea";
import { ToastAlert } from "@components/ToastAlert";

import { Language as LanguageEntity } from "@core/domain/entities/Language";
import { Coutries, ICoutries } from "@core/providers/Countries";
import { useLanguage } from "@core/hooks/Language";

export function Language() {
  const { set: setLanguage, get: getLanguage, loading } = useLanguage();
  const toast = useToast();
  const navigation = useNavigation();

  const coutries: ICoutries[] = Coutries;
  const [from, setFrom] = useState<ICoutries | null>();
  const [to, setTo] = useState<ICoutries | null>();

  useEffect(() => {
    if (to)
      validateSelection();
  }, [from, to]);

  useEffect(() => {
    loadLanguages();
  }, []);

  const loadLanguages = async () => {
    const storageLanguage = await getLanguage();

    if (!!storageLanguage) {
      const currentLanguageProps = storageLanguage.toObject();

      setFrom(currentLanguageProps.from);
      setTo(currentLanguageProps.to);
    }
  }

  const save = async () => {
    if (from && to) {
      try {
        const languageEntity = new LanguageEntity({
          to: to,
          from: from,
        });

        setLanguage(languageEntity);
        navigation.goBack();
      } catch (e) {
        toast.show({
          render: () => {
            return <ToastAlert title="Was not possible to save" />;
          }
        });
      }
    } else {
      toast.show({
        render: () => {
          return <ToastAlert title="You must infor the language" />;
        }
      });
    }
  }

  const validateSelection = () => {
    if (from?.code === to?.code) {
      toast.show({
        render: () => {
          return <ToastAlert title="You can't select the same language" />;
        }
      });

      setTo(null);
    }
  }

  const keyExtractor = useCallback((item: ICoutries) => {
    return item.code;
  }, []);

  const renderItemFrom = useCallback(({ item }) => {
    return (
      <CountryCard {...item} active={item.code === from?.code} onPress={() => setFrom(item)} />
    );
  }, [from]);

  const renderItemTo = useCallback(({ item }) => {
    return (
      <CountryCard {...item} active={item.code === to?.code} onPress={() => setTo(item)} />
    );
  }, [to]);

  return (
    <SafeArea>
      <VStack flex={1} justifyContent={'center'}>
        {
          loading ? <Loading /> : (
            <>
              <HStack display={'flex'} flexDir={'column'} mb={4}>
                <Text bold mb={2} ml={3}>From</Text>

                <FlatList
                  data={coutries}
                  renderItem={renderItemFrom}
                  keyExtractor={keyExtractor}
                  horizontal={true}
                />
              </HStack>

              <HStack display={'flex'} flexDir={'column'} mb={4}>
                <Text bold mb={2} ml={3}>To</Text>

                <FlatList
                  data={coutries}
                  renderItem={renderItemTo}
                  keyExtractor={keyExtractor}
                  horizontal={true}
                />
              </HStack>
            </>
          )
        }
      </VStack >

      <Button ml={3} mr={3} mb={3} onPress={save} padding={6} variant="outline" justifyContent="center">
        <Text textAlign={"center"}>Save</Text>
      </Button>
    </SafeArea >
  );
}

