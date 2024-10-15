package com.sbcamping.user.member.service;

import com.sbcamping.domain.Member;
import com.sbcamping.user.member.dto.MemberDTO;
import com.sbcamping.user.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Slf4j
@RequiredArgsConstructor
@Service
public class CustomUserDetailService implements UserDetailsService {

    // Spring Security

    private final MemberRepository memberRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        log.info("=========================================loadUserByUsername 도착");
        log.info("=========================================username: " + username);

//        Optional<Member> memberOptional = memberRepository.findByMemberEmail(username);
//        Member member = memberOptional.orElseThrow(() ->
//                new UsernameNotFoundException("Not Found Member : {} " + username)
//        );

        Member member = memberRepository.findByMemberEmail(username);

        log.info("======================member role : " + member.getMemberRole());

        MemberDTO memberDTO = new MemberDTO(
                member.getMemberEmail(),
                member.getMemberPw(),
                member.getMemberName(),
                member.getMemberPhone(),
                member.getMemberGender(),
                member.getMemberBirth(),
                member.getMemberLocal(),
                member.getMemberRole(),
                member.getMemberID()
        );

        log.info(memberDTO.toString());

        return memberDTO;
    }


}
