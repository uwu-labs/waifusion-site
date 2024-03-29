/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import styled from "styled-components";
import { PageContentWrapper } from "../components/CommonLayout";
import Head from "../components/Head";
import { HashIcon } from "../components/Icons";
import LargeWaifuCard from "../components/LargeWaifuCard";
import Loading from "../components/Loading";
import TraitTag from "../components/TraitTag";
import WaifuOwner from "../components/WaifuOwner";
import ViewOnMarketplace from "../components/ViewOnMarketplace";
import { makeRequest } from "../services/api";
import { addWaifu, selectWaifus, setWaifus } from "../state/reducers/waifus";
import { Waifu, Attribute } from "../types/waifusion";

const LoadingContainer = styled.div`
  position: relative;
  width: 100%;
  height: 70vh;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  max-width: 1200px;
  margin: auto;

  @media (max-width: 768px) {
    width: 100%;
    flex-direction: column;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  flex: 1;
  width: 100%;

  h1 {
    margin: 0;
    font-size: 28pt;
  }

  h2 {
    margin: 20px 0;
    font-weight: 500;
  }

  p {
    margin: 0;
    font-size: 16pt;
    color: var(--text-secondary);
  }
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const PrimaryInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const AdditionalInfo = styled.div`
  display: flex;
`;

const MetaRow = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  color: var(--text-secondary);
`;

const MetaItem = styled.div`
  display: flex;
  flex-direction: row;
  margin-right: 20px;
  align-items: center;
  font-weight: 500;
  font-size: 16pt;

  svg {
    height: 16pt;
  }

  line {
    color: var(--text-secondary);
  }

  label {
    color: var(--text-secondary);
  }
`;

const TraitsContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

type ParamProps = {
  id: string;
};

const WaifuDetail: React.FC = () => {
  const [t] = useTranslation();
  const dispatch = useDispatch();
  const { id } = useParams<ParamProps>();
  const waifus = useSelector(selectWaifus);
  const waifu = waifus.filter((w: Waifu) => Number(w.index) === Number(id))[0];
  const getWaifu = async () => {
    const response = await makeRequest(`${id}`, {
      method: "GET",
    });
    if (!response) {
      return;
    }
    const _waifu: Waifu = response;
    if (
      waifus.map((w: Waifu) => Number(w.index)).indexOf(_waifu.index) === -1
    ) {
      dispatch(addWaifu(_waifu));
    } else {
      const newWaifus: Waifu[] = [];
      waifus.forEach((w: Waifu) => {
        if (Number(w.index) !== _waifu.index) newWaifus.push(w);
        else newWaifus.push(_waifu);
      });
      dispatch(setWaifus(newWaifus));
    }
  };

  useEffect(() => {
    getWaifu();
  }, []);

  return (
    <PageContentWrapper>
      <Head title="Waifu" />
      {!waifu && (
        <LoadingContainer>
          <Loading />
        </LoadingContainer>
      )}
      {waifu && (
        <Wrapper>
          <Head
            title="Waifu"
            subtitle={`${waifu.name && `${waifu.name} - `}${waifu.index}`}
          />
          <LargeWaifuCard id={Number(waifu.index)} />
          <Content>
            <Header>
              <PrimaryInfo>
                <h1>{waifu.name}</h1>
                <MetaRow>
                  <MetaItem>
                    <HashIcon />
                    <label>{waifu.index}</label>
                  </MetaItem>
                </MetaRow>
              </PrimaryInfo>

              <AdditionalInfo>
                {waifu.owner && <WaifuOwner owner={waifu.owner} />}
                <ViewOnMarketplace />
              </AdditionalInfo>
            </Header>

            {waifu.bio && (
              <>
                <h2>{t("waifuDetail.bio")}</h2>
                <p>{waifu.bio}</p>
              </>
            )}

            {waifu.attributes && (
              <>
                <h2>{t("waifuDetail.traits")}</h2>
                <TraitsContainer>
                  {waifu.attributes.map((trait: Attribute) => (
                    <TraitTag key={trait.trait_type} attribute={trait} />
                  ))}
                </TraitsContainer>
              </>
            )}

            {/* {(userWafuIds.indexOf(waifu.index) > -1 ||
              (waifu.owner &&
                waifu.owner.address.toUpperCase() ===
                  address.toUpperCase())) && (
              <>
                <h2>{t("waifuDetail.tools")}</h2>
                <Button onClick={() => setChangingName(true)}>
                  {t("buttons.changeName")}
                </Button>
              </>
            )} */}
          </Content>
        </Wrapper>
      )}
      {/* <ChangeName
        show={changingName}
        close={() => setChangingName(false)}
        waifu={waifu}
      /> */}
    </PageContentWrapper>
  );
};

export default WaifuDetail;
