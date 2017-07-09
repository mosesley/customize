package com.ztw.admin.security;

import com.ztw.admin.model.Role;
import com.ztw.admin.model.User;
import com.ztw.admin.model.UserRole;
import com.ztw.admin.repository.RoleRepository;
import com.ztw.admin.repository.UserRepository;
import com.ztw.admin.repository.UserRoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * ${DESCRIPTION}
 *
 * @author 马旭
 * @created 2017-07-09 10:47.
 */
@Service
public class JwtUserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserRoleRepository userRoleRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username);
        if (user == null) {
            throw new UsernameNotFoundException(String.format("No user found with username '%s'.", username));
        } else {
            List<String> ids = new ArrayList<>();
            List<UserRole> urs = userRoleRepository.findByUserId(user.getId());
            for (UserRole ur: urs) {
                ids.add(ur.getRoleId());
            }

            List<Role> roles = roleRepository.findAll(ids);
            return JwtUserFactory.create(user, roles);
        }
    }
}
